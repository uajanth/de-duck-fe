import AuthForm from "../../components/AuthForm";

export default function AuthWrapper({ isLoggedIn, children }) {
	if (isLoggedIn) {
		return children;
	}
	return <AuthForm />;
}
