import { Link } from "react-router";

function ErrorPage() {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <p>
          Wrong page{" "}
          <Link to="/" className="text-green-600">
            click here
          </Link>{" "}
          to go back to home page
        </p>
      </div>
    </>
  );
}

export default ErrorPage;
