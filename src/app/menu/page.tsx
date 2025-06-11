const menuCategories: {
  id: number;
  name: string;
  items: { id: number; name: string; price: string; description: string }[];
}[] = [
  {
    id: 1,
    name: 'Appetizers and Salads',
    items: [
      { id: 1, name: 'Spring Rolls', price: '$8.99', description: 'Fresh vegetables wrapped in rice paper' },
      { id: 2, name: 'Calamari', price: '$12.99', description: 'Crispy fried squid with dipping sauce' },
      { id: 3, name: 'Bruschetta', price: '$9.99', description: 'Toasted bread with fresh tomatoes and herbs' },
    ],
  },
  {
    id: 2,
    name: 'Main Courses',
    items: [
      { id: 4, name: 'Grilled Salmon', price: '$24.99', description: 'Fresh salmon with seasonal vegetables' },
      { id: 5, name: 'Beef Tenderloin', price: '$29.99', description: 'Premium cut with red wine reduction' },
      { id: 6, name: 'Vegetable Pasta', price: '$18.99', description: 'Fresh pasta with seasonal vegetables' },
    ],
  },
  {
    id: 3,
    name: 'Desserts',
    items: [
      { id: 7, name: 'Tiramisu', price: '$8.99', description: 'Classic Italian dessert' },
      { id: 8, name: 'Chocolate Cake', price: '$7.99', description: 'Rich chocolate layers with ganache' },
      { id: 9, name: 'Crème Brûlée', price: '$8.99', description: 'Classic French custard dessert' },
    ],
  },
];

export default function Menu() {
  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Menu</h1>
        <div className="grid md:grid-cols-2 gap-12">
          {menuCategories.map((category) => (
            <div key={category.id}>
              <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
              <ul className="space-y-4">
                {category.items.map((item) => (
                  <li key={item.id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                    <span className="text-orange-500 font-semibold text-lg mt-2 md:mt-0">{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 