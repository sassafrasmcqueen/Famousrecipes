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
    {
      id: 10,
      title: 'The French Laundry Oysters and Pearls',
      description: 'Thomas Keller’s legendary "sabayon of pearl tapioca with Beau Soleil oysters and white sturgeon caviar." The pinnacle of fine dining at home.',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800',
      category: 'Michelin-Inspired Entrees'
    },
  ]

  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistSuccess, setWaitlistSuccess] = useState(false)
  const [membershipEmail, setMembershipEmail] = useState('')
  const [membershipSuccess, setMembershipSuccess] = useState(false)

  const categories = ['All', 'Launch Classics', 'Burger Wars', 'Diner Classics', 'Michelin-Inspired Entrees']

  const filteredRecipes = activeCategory === 'All' 
    ? recipes 
    : recipes.filter(r => r.category === activeCategory)

  const handleBuyClick = (recipe) => {
    setSelectedRecipe(recipe)
    setIsModalOpen(true)
    setIsSuccess(false)
    setEmail('')
  }

  const handleMembershipJoin = async (e) => {
    e.preventDefault()
    if (!membershipEmail) return

    setIsSubmitting(true)
    try {
      const response = await fetch('http://localhost:3001/api/membership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: membershipEmail,
        }),
      })
      if (response.ok) {
        setMembershipSuccess(true)
      }
    } catch (error) {
      console.error('Error joining membership:', error)
      setMembershipSuccess(true) // Fallback
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePurchase = async (e) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    try {
      const response = await fetch('http://localhost:3001/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipeTitle: selectedRecipe.title,
          email: email,
          price: '.99'
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        alert('Failed to process purchase. Please try again.')
      }
    } catch (error) {
      console.error('Error processing purchase:', error)
      setIsSuccess(true) // Fallback for demo
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWaitlistJoin = async (e) => {
    e.preventDefault()
    if (!waitlistEmail) return

    setIsSubmitting(true)
    try {
      const response = await fetch('http://localhost:3001/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipeTitle: 'Waitlist Join',
          email: waitlistEmail,
          price: 'N/A'
        }),
      })
      if (response.ok) {
        setWaitlistSuccess(true)
      }
    } catch (error) {
      console.error('Error joining waitlist:', error)
      setWaitlistSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <div key={recipe.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 flex flex-col h-full border border-stone-100">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 right-4 bg-orange-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                  Digital Card — .99
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
                <button 
                  onClick={() => handleBuyClick(recipe)}
                  className="w-full bg-stone-900 text-white py-3 rounded-md font-bold text-sm hover:bg-orange-600 transition-all duration-300"
                >
                  Buy Now
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

      {/* Checkout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!isSuccess ? (
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="inline-block bg-orange-100 text-orange-600 p-3 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-serif text-stone-800">Complete Your Order</h2>
                  <p className="text-stone-500 mt-2">Get instant access to the secrets of {selectedRecipe?.title}.</p>
                </div>

                <div className="bg-stone-50 rounded-xl p-4 mb-6 border border-stone-100">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-stone-500">Item:</span>
                    <span className="font-bold text-stone-800 truncate max-w-[200px]">{selectedRecipe?.title}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-stone-500">Price:</span>
                    <span className="font-bold text-orange-600">.99</span>
                  </div>
                </div>

                <form onSubmit={handlePurchase}>
                  <div className=\"mb-6\">
                    <label className=\"block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2\">Delivery Email</label>
                    <input 
                      type=\"email\" 
                      required
                      placeholder=\"chef@example.com\"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className=\"w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:border-orange-600 transition\"
                    />
                  </div>
                  <button 
                    disabled={isSubmitting}
                    className=\"w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 disabled:opacity-50\"
                  >
                    {isSubmitting ? 'Processing...' : 'Complete Purchase — .99'}
                  </button>
                </form>
                <p className=\"text-center text-[10px] text-stone-400 mt-6 uppercase tracking-tighter\">
                  Secure simulated payment powered by VaultPay
                </p>
              </div>
            ) : (
              <div className=\"p-12 text-center\">
                <div className=\"inline-block bg-green-100 text-green-600 p-4 rounded-full mb-6\">
                  <svg xmlns=\"http://www.w3.org/2000/svg\" className=\"h-12 w-12\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">
                    <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={3} d=\"M5 13l4 4L19 7\" />
                  </svg>
                </div>
                <h2 className=\"text-3xl font-serif text-stone-800 mb-4\">You're in the Vault!</h2>
                <p className=\"text-stone-600 mb-8\">
                  We'll email your digital recipe card for <span className=\"font-bold\">{selectedRecipe?.title}</span> shortly.
                </p>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className=\"bg-stone-900 text-white px-8 py-3 rounded-full font-bold hover:bg-stone-800 transition\"
                >
                  Back to Collection
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Membership Section */}
      <section className="py-24 px-8 bg-stone-100">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-stone-200">
            <div className="lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
              <div className="inline-block bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 w-fit">
                Coming Soon
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6">The Vault Membership</h2>
              <p className="text-stone-600 text-lg mb-10 leading-relaxed">
                For the serious home cook. Get everything you need to master the world's most iconic dishes in one place.
              </p>
              
              <ul className=\"space-y-6 mb-12\">
                {[
                  { title: 'Unlimited Access', desc: 'The full digital archive of 100+ iconic recipes.' },
                  { title: 'Early Drops', desc: 'Be the first to cook new releases 7 days before the store.' },
                  { title: 'Video Walkthroughs', desc: 'Pro-shot, step-by-step tutorials for every dish.' },
                  { title: 'Secret Ingredient Sourcing', desc: 'Know exactly where to buy that specific NYC flour or French butter.' }
                ].map((item, i) => (
                  <li key={i} className=\"flex items-start\">
                    <div className=\"bg-orange-600 rounded-full p-1 mr-4 mt-1\">
                      <svg xmlns=\"http://www.w3.org/2000/svg\" className=\"h-4 w-4 text-white\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">
                        <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={3} d=\"M5 13l4 4L19 7\" />
                      </svg>
                    </div>
                    <div>
                      <h4 className=\"font-bold text-stone-800\">{item.title}</h4>
                      <p className=\"text-stone-500 text-sm\">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {!membershipSuccess ? (
                <form onSubmit={handleMembershipJoin} className=\"flex flex-col sm:flex-row gap-4\">
                  <input 
                    type=\"email\" 
                    required
                    placeholder=\"Enter your email\" 
                    value={membershipEmail}
                    onChange={(e) => setMembershipEmail(e.target.value)}
                    className=\"flex-grow px-6 py-4 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-600 transition\"
                  />
                  <button 
                    disabled={isSubmitting}
                    className=\"bg-stone-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg disabled:opacity-50 whitespace-nowrap\"
                  >
                    {isSubmitting ? 'Joining...' : 'Join The Vault'}
                  </button>
                </form>
              ) : (
                <div className=\"bg-green-50 border border-green-200 text-green-700 p-6 rounded-2xl flex items-center\">
                  <svg xmlns=\"http://www.w3.org/2000/svg\" className=\"h-6 w-6 mr-3 flex-shrink-0\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">
                    <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z\" />
                  </svg>
                  <span className=\"font-medium\">You're on the list! We'll invite you when the doors open.</span>
                </div>
              )}
            </div>
            <div className=\"lg:w-1/2 bg-stone-900 relative min-h-[400px]\">
              <img 
                src=\"https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200\" 
                alt=\"Chef at work\" 
                className=\"absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity\"
              />
              <div className=\"absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent lg:bg-gradient-to-l\"></div>
              <div className=\"absolute bottom-12 left-12 right-12 text-white\">
                <div className=\"text-5xl font-serif mb-2 italic\">$19/mo</div>
                <div className=\"text-stone-400 uppercase tracking-widest text-sm font-bold\">Founder's Pricing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Vault CTA */}
      <section id=\"join\" className=\"bg-stone-900 py-24 px-8 text-white relative overflow-hidden\">
        <div className=\"absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent\"></div>
        <div className=\"max-w-4xl mx-auto text-center relative z-10\">
          <h2 className=\"text-4xl font-serif mb-6\">Access The Vault</h2>
          <p className=\"text-stone-400 text-lg mb-10\">
            Get unlimited access to our full archive, early recipe drops, and exclusive video walkthroughs. Join the waitlist for our upcoming membership.
          </p>
          
          {!waitlistSuccess ? (
            <form className=\"flex flex-col md:flex-row gap-4 max-w-md mx-auto\" onSubmit={handleWaitlistJoin}>
              <input 
                type=\"email\" 
                required
                placeholder=\"Enter your email\" 
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                className=\"bg-white/5 border border-white/20 rounded-md px-6 py-4 flex-grow focus:outline-none focus:border-orange-600 transition\"
              />
              <button 
                disabled={isSubmitting}
                className=\"bg-orange-600 text-white px-8 py-4 rounded-md font-bold hover:bg-orange-700 transition shadow-lg disabled:opacity-50\"
              >
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </button>
            </form>
          ) : (
            <div className=\"text-green-500 font-bold text-xl animate-bounce\">
              Welcome to the Vault! We'll notify you soon.
            </div>
          )}
          
          <p className=\"mt-6 text-stone-500 text-sm\">No spam. Only secret sauce.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className=\"py-12 px-8 border-t border-stone-200 text-center text-stone-500 text-sm uppercase tracking-widest\">
        &copy; {new Date().getFullYear()} Signature Vault. All rights reserved.
      </footer>
    </div>
  )
}

export default App
