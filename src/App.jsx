import React, { useState } from 'react'

function App() {
  const recipes = [
    {
      id: 1,
      title: 'Levain Bakery Chocolate Chip Cookies',
      description: 'The legendary NYC six-ounce mountain of a cookie. Perfectly craggy on the outside with a thick, gooey center that stays soft for days.',
      image: '/images/levain-cookies.png',
      category: 'Launch Classics'
    },
    {
      id: 2,
      title: 'IKEA Swedish Meatballs',
      description: 'The ultimate furniture store comfort food. A precise beef-and-pork blend served with the iconic, umami-packed cream sauce.',
      image: '/images/ikea-meatballs.png',
      category: 'Launch Classics'
    },
    {
      id: 3,
      title: 'Disney Pineapple Dole Whip',
      description: 'A cult-status tropical soft-serve from the Magic Kingdom. Refreshing, creamy, and surprisingly easy to master at home.',
      image: '/images/disney-dole-whip.png',
      category: 'Launch Classics'
    },
    {
      id: 4,
      title: 'In-N-Out Double-Double (Animal Style)',
      description: 'The California classic: two beef patties, two slices of cheese, and the legendary "Animal Style" treatment featuring mustard-grilled patties and caramelized onions.',
      image: '/images/in-n-out-double-double.png',
      category: 'Burger Wars'
    },
    {
      id: 5,
      title: 'Shake Shack ShackBurger',
      description: 'The modern cult classic: a custom brisket-chuck blend patty, melted American cheese, and the secretive ShackSauce on a toasted potato roll.',
      image: '/images/shake-shack-shackburger.png',
      category: 'Burger Wars'
    },
    {
      id: 6,
      title: 'The Habit Burger Charburger',
      description: "Santa Barbara's favorite: a 100% fresh ground beef patty char-grilled over open flames for that distinctive smokey flavor, topped with caramelized onions and mayo.",
      image: '/images/habit-charburger.png',
      category: 'Burger Wars'
    },
    {
      id: 7,
      title: 'Carnegie Deli Pastrami Sandwich',
      description: 'The iconic NYC mile-high sandwich: tender, pepper-crusted brisket steamed to perfection and served on double-baked rye with spicy brown mustard.',
      image: '/images/carnegie-pastrami.png',
      category: 'Diner Classics'
    },
    {
      id: 8,
      title: 'NYC Bodega Bacon, Egg & Cheese',
      description: 'The ultimate New York breakfast: two eggs, crispy bacon, and melted American cheese on a buttered, toasted Kaiser roll, wrapped in foil for that perfect steam.',
      image: '/images/bodega-egg-cheese.png',
      category: 'Diner Classics'
    },
    {
      id: 9,
      title: "Junior's Original New York Cheesecake",
      description: 'The Brooklyn institution: a rich, dense, and creamy cheesecake with a light sponge cake crust that has set the gold standard for NY cheesecake since 1950.',
      image: '/images/juniors-cheesecake.png',
      category: 'Diner Classics'
    },
  ]

  const [activeCategory, setActiveCategory] = useState('All')
  const categories = ['All', 'Launch Classics', 'Burger Wars', 'Diner Classics']

  const filteredRecipes = activeCategory === 'All' 
    ? recipes 
    : recipes.filter(r => r.category === activeCategory)

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="text-2xl font-bold tracking-tighter text-stone-800">
          SIGNATURE<span className="text-orange-600">VAULT</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest">
          <a href="#recipes" className="hover:text-orange-600 transition">Recipes</a>
          <a href="#about" className="hover:text-orange-600 transition">About</a>
          <a href="#join" className="hover:text-orange-600 transition">The Vault</a>
        </div>
        <button className="bg-stone-900 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-stone-800 transition">
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <header className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000" 
            alt="Delicious Food" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
            The World's Most Iconic Dishes. <br /> In Your Kitchen.
          </h1>
          <p className="text-xl md:text-2xl text-stone-200 mb-10 font-light">
            Professional-grade, meticulously tested copycat recipes from the restaurants you love.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a href="#recipes" className="bg-orange-600 text-white px-10 py-4 rounded-md text-lg font-bold hover:bg-orange-700 transition w-full md:w-auto text-center">
              Explore the Collection
            </a>
            <a href="#join" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-md text-lg font-bold hover:bg-white/20 transition w-full md:w-auto text-center">
              Join the Waitlist
            </a>
          </div>
        </div>
      </header>

      {/* Recipe Showcase */}
      <section id="recipes" className="py-24 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif mb-4 text-stone-800">Famous Flavors</h2>
          <p className="text-stone-600 max-w-2xl mx-auto italic">Master the secrets of the greats. Meticulously tested for accuracy.</p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-white text-stone-500 border border-stone-200 hover:border-orange-600 hover:text-orange-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 flex flex-col h-full">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 right-4 bg-orange-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                  Digital Card — $2.99
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-stone-800 text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded shadow-sm">
                  {recipe.category}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-3 text-stone-800">{recipe.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-6 flex-grow">
                  {recipe.description}
                </p>
                <button className="w-full border border-stone-200 py-3 rounded-md font-bold text-sm hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-300">
                  Coming Soon
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredRecipes.length === 0 && (
          <div className="text-center py-20">
            <p className="text-stone-400 italic">No recipes found in this category. Stay tuned for new drops.</p>
          </div>
        )}
      </section>

      {/* Join the Vault CTA */}
      <section id="join" className="bg-stone-900 py-24 px-8 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-serif mb-6">Access The Vault</h2>
          <p className="text-stone-400 text-lg mb-10">
            Get unlimited access to our full archive, early recipe drops, and exclusive video walkthroughs. Join the waitlist for our upcoming membership.
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-white/5 border border-white/20 rounded-md px-6 py-4 flex-grow focus:outline-none focus:border-orange-600 transition"
            />
            <button className="bg-orange-600 text-white px-8 py-4 rounded-md font-bold hover:bg-orange-700 transition shadow-lg">
              Join Waitlist
            </button>
          </form>
          <p className="mt-6 text-stone-500 text-sm">No spam. Only secret sauce.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-stone-200 text-center text-stone-500 text-sm uppercase tracking-widest">
        &copy; {new Date().getFullYear()} Signature Vault. All rights reserved.
      </footer>
    </div>
  )
}

export default App
