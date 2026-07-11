import "./HeroCard.css";

function HeroCard({

    user,

    title,

    buttonText,

    image,

    onClick

}){

    return(

        <div className="hero-card">

            <div className="hero-left">

                <img
                    src={image}
                    alt=""
                    className="hero-image"
                />

                <h1>

                    Welcome,

                    {" "}

                    {user.first_name}

                    !

                </h1>

                <h2>

                    {title}

                </h2>

            </div>

            <button

            className="hero-button"

            onClick={onClick}

            >

                {buttonText}

            </button>

        </div>

    );

}

export default HeroCard;