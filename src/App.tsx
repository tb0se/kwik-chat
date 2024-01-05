import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

function App() {
	return (
		<div className="w-full h-screen bg-gunmetal flex">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
