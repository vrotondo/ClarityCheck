function App() {
    console.log('App component rendering...');

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>ClarityCheck Debug Test</h1>
            <p>If you can see this, React is working!</p>
            <button onClick={() => alert('Button works!')}>
                Test Button
            </button>
        </div>
    );
}

export default App;