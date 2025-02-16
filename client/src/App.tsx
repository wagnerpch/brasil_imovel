import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FirebaseProvider } from "@/components/FirebaseProvider";
import Home from "@/pages/Home";
import PropertyDetails from "@/pages/PropertyDetails";
import AuthPage from "@/pages/AuthPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/property/:id" component={PropertyDetails} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <FirebaseProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Router />
          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </FirebaseProvider>
  );
}

export default App;