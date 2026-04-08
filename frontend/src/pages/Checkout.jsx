const Checkout = () => {
    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Checkout Flow</h1>
            <div className="glass" style={{ padding: '2rem' }}>
                <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Shipping Details</h2>
                <input type="text" placeholder="Address" className="form-input" style={{ marginBottom: '1rem' }} />
                <button className="btn btn-primary">Proceed to Payment</button>
            </div>
        </div>
    );
};
export default Checkout;
