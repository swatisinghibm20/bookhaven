// Shared mock data used by the Catalogue, Cart and Order History pages.

export const BOOKS = [
  { id: 1, title: "The Name of the Wind", author: "Patrick Rothfuss", price: "£12.99", oldPrice: "£15.99", tag: "Fiction", publisher: "Penguin Books", format: "Paperback", emoji: "📖", color: "blue", rating: 5, delivery: "Est. delivery: 2–3 days", ribbon: "Bestseller" },
  { id: 2, title: "The Wise Man's Fear", author: "Patrick Rothfuss", price: "£14.99", tag: "Fantasy", publisher: "Penguin Books", format: "Hardcover", emoji: "📚", color: "pink", rating: 4, delivery: "Est. delivery: 2–3 days" },
  { id: 3, title: "A Wizard of Earthsea", author: "Ursula K. Le Guin", price: "£9.99", tag: "Fantasy", publisher: "Bloomsbury", format: "Paperback", emoji: "🔮", color: "green", rating: 5, delivery: "Est. delivery: 1–2 days", ribbon: "New" },
  { id: 4, title: "The Way of Kings", author: "Brandon Sanderson", price: "£16.99", tag: "Epic Fantasy", publisher: "Macmillan", format: "Hardcover", emoji: "🌟", color: "yellow", rating: 5, delivery: "Est. delivery: 3–4 days", ribbon: "Bestseller" },
  { id: 5, title: "The Blade Itself", author: "Joe Abercrombie", price: "£11.99", tag: "Dark Fantasy", publisher: "HarperCollins", format: "eBook", emoji: "🏰", color: "purple", rating: 4, delivery: "Instant download" },
  { id: 6, title: "Elantris", author: "Brandon Sanderson", price: "£10.99", oldPrice: "£13.99", tag: "Fantasy", publisher: "Macmillan", format: "Paperback", emoji: "🐉", color: "red", rating: 4, delivery: "Est. delivery: 2–3 days" },
  { id: 7, title: "The Night Circus", author: "Erin Morgenstern", price: "£13.49", tag: "Urban Fantasy", publisher: "Random House", format: "Audiobook", emoji: "✨", color: "cyan", rating: 5, delivery: "Instant download", ribbon: "New" },
  { id: 8, title: "Mistborn: The Final Empire", author: "Brandon Sanderson", price: "£12.49", tag: "Fantasy", publisher: "Macmillan", format: "Paperback", emoji: "🌙", color: "lime", rating: 5, delivery: "Est. delivery: 2–3 days", ribbon: "Bestseller" },
];

// "Recommended for you" on the cart page (ids from BOOKS above)
export const RECOMMENDATIONS = [5, 8, 3].map((id) => BOOKS.find((b) => b.id === id));

// Past purchases. Each entry has the same fields as a BOOKS entry (plus order info),
// so "Buy Again" can put it straight into the cart. Ids start at 101 to avoid clashes.
export const ORDER_HISTORY = [
  { id: 101, orderId: "BH-2025-061201", date: "12 Jun 2025", title: "Dune", author: "Frank Herbert", price: "£9.99", tag: "Fiction", publisher: "Penguin Books", format: "Paperback", emoji: "🏜️", color: "yellow", rating: 5, delivery: "Est. delivery: 2–3 days", cover: "https://covers.openlibrary.org/b/isbn/9780441013593-M.jpg" },
  { id: 102, orderId: "BH-2025-050302", date: "3 May 2025", title: "Neuromancer", author: "William Gibson", price: "£8.99", tag: "Science & Tech", publisher: "Penguin Books", format: "Paperback", emoji: "🤖", color: "cyan", rating: 4, delivery: "Est. delivery: 2–3 days", cover: "https://covers.openlibrary.org/b/isbn/9780441569595-M.jpg" },
  { id: 103, orderId: "BH-2025-041403", date: "14 Apr 2025", title: "The Hobbit", author: "J.R.R. Tolkien", price: "£7.99", tag: "Fantasy", publisher: "HarperCollins", format: "Paperback", emoji: "🧙", color: "green", rating: 5, delivery: "Est. delivery: 1–2 days", cover: "https://covers.openlibrary.org/b/isbn/9780547928227-M.jpg" },
  { id: 104, orderId: "BH-2025-030204", date: "2 Mar 2025", title: "Foundation", author: "Isaac Asimov", price: "£8.49", tag: "Science & Tech", publisher: "Random House", format: "Paperback", emoji: "🪐", color: "purple", rating: 5, delivery: "Est. delivery: 2–3 days", cover: "https://covers.openlibrary.org/b/isbn/9780553293357-M.jpg" },
  { id: 105, orderId: "BH-2025-011805", date: "18 Jan 2025", title: "1984", author: "George Orwell", price: "£6.99", tag: "Fiction", publisher: "Penguin Books", format: "Paperback", emoji: "👁️", color: "red", rating: 5, delivery: "Est. delivery: 1–2 days", cover: "https://covers.openlibrary.org/b/isbn/9780451524935-M.jpg" },
  { id: 106, orderId: "BH-2024-120506", date: "5 Dec 2024", title: "Project Hail Mary", author: "Andy Weir", price: "£12.99", tag: "Science & Tech", publisher: "Random House", format: "Hardcover", emoji: "🚀", color: "blue", rating: 5, delivery: "Est. delivery: 3–4 days", cover: "https://covers.openlibrary.org/b/isbn/9780593135204-M.jpg" },
];
