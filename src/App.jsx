import React from 'react'

function App() {
  const recipes = [
    {
      id: 1,
      title: 'Levain Bakery Style Cookies',
      description: 'The thick, gooey, and legendary NYC cookie recreated.',
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 2,
      title: 'IKEA Swedish Meatballs',
      description: 'The original furniture store classic with creamy gravy.',
      image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 3,
      title: 'Disney Dole Whip',
      description: 'Refreshing pineapple soft serve from the Magic Kingdom.',
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800',
    },
  ]

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white border-b border-stone-200">
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
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
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
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-4">Famous Flavors</h2>
          <p className="text-stone-600 max-w-2xl mx-auto italic">Our first three signature drops. Master the secrets of the greats.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 right-4 bg-orange-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Digital Card
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3">{recipe.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  {recipe.description}
                </p>
                <button className="w-full border border-stone-200 py-3 rounded-md font-bold text-sm hover:bg-stone-50 transition">
                  Coming Soon
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join the Vault CTA */}
      <section id="join" className="bg-stone-900 py-24 px-8 text-white">
        <div className="max-w-4xl mx-auto text-center">
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
            <button className="bg-orange-600 text-white px-8 py-4 rounded-md font-bold hover:bg-orange-700 transition">
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
