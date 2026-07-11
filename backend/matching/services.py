from math import radians, sin, cos, sqrt, atan2

from marketplace.models import Produce, Demand
from .models import Match

GRADE_RANK = {
    "Standard": 1,
    "Grade B": 2,
    "Grade A": 3,
    "Premium": 4,
}
def calculate_distance(location1, location2):
    """
    Returns the distance in kilometres between two locations.
    """

    earth_radius = 6371

    lat1 = radians(float(location1.latitude))
    lon1 = radians(float(location1.longitude))

    lat2 = radians(float(location2.latitude))
    lon2 = radians(float(location2.longitude))

    delta_lat = lat2 - lat1
    delta_lon = lon2 - lon1

    a = (
        sin(delta_lat / 2) ** 2
        + cos(lat1)
        * cos(lat2)
        * sin(delta_lon / 2) ** 2
    )

    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return round(earth_radius * c, 2)

def calculate_quantity_score(produce, demand):
    """
    Returns a quantity score out of 20.
    """

    quantity = produce.quantity_available

    if quantity < demand.minimum_quantity:
        return 0

    return 20
def calculate_budget_score(produce, demand):
    """
    Returns a budget score out of 20.
    """

    price = produce.total_price

    if demand.minimum_budget <= price <= demand.maximum_budget:
        return 20

    return 0

def calculate_organic_score(produce, demand):
    """
    Returns an organic score out of 10.
    """

    if not demand.organic_required:
        return 10

    if produce.organic_certified:
        return 10

    return 0
def calculate_grade_score(produce, demand):
    """
    Returns a grade score out of 15.
    """

    produce_grade = GRADE_RANK[produce.grade]
    required_grade = GRADE_RANK[demand.minimum_grade]

    if produce_grade >= required_grade:
        return 15

    return 0
def calculate_distance_score(produce, demand):
    """
    Returns:
        score (0-15)
        distance in km
    """

    distance = calculate_distance(
        produce.location,
        demand.location
    )

    if distance <= demand.maximum_distance_km:
        return 15, distance

    return 0, distance
  

def calculate_variety_score(produce, demand):
    """
    Returns a variety score out of 10.
    """

    # Buyer doesn't care about variety
    if not demand.variety:
        return 10

    # Compare varieties (case insensitive)
    if produce.variety.strip().lower() == demand.variety.strip().lower():
        return 10

    return 0

def calculate_date_score(produce, demand):
    """
    Returns a date score out of 10.
    """

    if produce.available_until >= demand.needed_before:
        return 10

    return 0

def calculate_match_score(produce, demand):
    """
    Calculates all individual scores and returns them.
    """

    quantity_score = calculate_quantity_score(produce, demand)

    budget_score = calculate_budget_score(produce, demand)

    organic_score = calculate_organic_score(produce, demand)

    grade_score = calculate_grade_score(produce, demand)

    distance_score, distance_km = calculate_distance_score(
        produce,
        demand
    )

    variety_score = calculate_variety_score(
        produce,
        demand
    )

    date_score = calculate_date_score(
        produce,
        demand
    )

    total_score = (
        quantity_score
        + budget_score
        + distance_score
        + grade_score
        + organic_score
        + variety_score
        + date_score
    )

    return {
        "match_score": total_score,

        "quantity_score": quantity_score,

        "budget_score": budget_score,

        "distance_score": distance_score,

        "grade_score": grade_score,

        "organic_score": organic_score,

        "variety_score": variety_score,

        "date_score": date_score,

        "distance_km": distance_km,
    }