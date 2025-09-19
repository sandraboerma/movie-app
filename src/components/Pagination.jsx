function makeWindow(current, total, size = 5) {
    const t = Math.max(1, Number(total) || 1);
    const c = Math.max(1, Math.min(Number(current) || 1, t));

    const half = Math.floor(size / 2);
    let start = Math.max(1, c - half);
    let end = start + size - 1;

    if (end > t) {
        end = t;
        start = Math.max(1, end - size + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function Pagination({ page, totalPages, onChange }) {
    if (!totalPages || totalPages <= 1) return null;

    const items = makeWindow(page, totalPages, 5);

    const goto = (p) => {
        const next = Math.max(1, Math.min(p, totalPages));
        if (next !== page) onChange(next);
    };

    return (
        <nav className="pagination" aria-label="Pagination">
            <button
                type="button"
                className="page-btn page-prevnext"
                onClick={() => goto(page - 1)}
                disabled={page <= 1}
                aria-label="Previous page"
            >
                Previous
            </button>

            <ul className="page-list">
                {items.map((num) => (
                    <li key={`p-${num}`}>
                        <button
                            type="button"
                            className={`page-btn ${num === page ? "page-btn-active" : ""}`}
                            aria-current={num === page ? "page" : undefined}
                            onClick={() => goto(num)}
                            title={`Page ${num}`}
                        >
                            {num}
                        </button>
                    </li>
                ))}
            </ul>

            <button
                type="button"
                className="page-btn page-prevnext"
                onClick={() => goto(page + 1)}
                disabled={page >= totalPages}
                aria-label="Next page"
            >
                Next
            </button>
        </nav>
    );
}

export default Pagination;
