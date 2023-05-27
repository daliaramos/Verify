export const Header = () => {
    return (
        <div>
            <h1>Verify</h1>
            <h3>Share you experience with others about the interview process at a company.</h3>
        </div>
    );
};

export const Button = () => {
    return(
        <button onClick={() => {
            alert("clicked")
        }
        }>
            Review a Company
        </button>
    )
}
