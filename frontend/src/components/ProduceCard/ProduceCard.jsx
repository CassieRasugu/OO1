import "./ProduceCard.css";

function ProduceCard({

    produce,

    onEdit,

    onDelete

}){

    return(

        <div className="produce-card">

            <div className="card-header">

                <div>

                    <h2>

                        {produce.produce_type_name}

                    </h2>

                    <p>

                        {produce.category_name}

                    </p>

                </div>

                <span className="status">

                    {produce.availability_status}

                </span>

            </div>

            <div className="card-body">

                <div>

                    <strong>Variety</strong>

                    <p>{produce.variety || "N/A"}</p>

                </div>

                <div>

                    <strong>Quantity</strong>

                    <p>

                        {produce.quantity_available} {produce.unit}

                    </p>

                </div>

                <div>

                    <strong>Price / Unit</strong>

                    <p>

                        KSh {produce.price_per_unit}

                    </p>

                </div>

                <div>

                    <strong>Grade</strong>

                    <p>{produce.grade}</p>

                </div>

                <div>

                    <strong>Organic</strong>

                    <p>

                        {produce.organic_certified ? "Yes 🌱" : "No"}

                    </p>

                </div>

                <div>

                    <strong>Location</strong>

                    <p>

                        {produce.location_name}

                    </p>

                </div>

            </div>

            <div className="description">

                <strong>Description</strong>

                <p>

                    {produce.description}

                </p>

            </div>

            <div className="card-footer">

                <button

                    className="edit-btn"

                    onClick={() => onEdit(produce.id)}

                >

                    Edit

                </button>

                <button

                    className="delete-btn"

                    onClick={() => onDelete(produce.id)}

                >

                    Delete

                </button>

            </div>

        </div>

    );

}

export default ProduceCard;