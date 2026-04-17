function App() {
  const name = "React";
  return <h1>Hello, {name}!</h1>;
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);