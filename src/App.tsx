import { RootLayout } from "./components/layout/RootLayout";
import { TodoList } from "./components/sample/TodoList";

function App() {
  return (
    <RootLayout>
      <div className="space-y-4">
        <TodoList />
      </div>
    </RootLayout>
  );
}

export default App;
