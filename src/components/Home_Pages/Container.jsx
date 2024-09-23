export default function Container({ children}) {
    return (
    <div className="min-h-screen flex flex-col">
    {children}
    </div>
    );
    }