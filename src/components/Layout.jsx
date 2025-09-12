function Layout({ children }) {
    return (
        <main>
            <div className="pattern" />
            <div className="wrapper">{children}</div>
        </main>
    );
}

export default Layout;
