<template>
  <div class="min-h-screen bg-amber-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-amber-800 mb-2">Bo Soukphasone</h1>
        <p class="text-lg text-amber-600">Menu Shop</p>
        <div class="w-24 h-1 bg-amber-400 mx-auto mt-4"></div>
      </div>

      <!-- Menu Tabs -->
      <div class="flex justify-center mb-10">
        <button
          @click="activeTab = 'food'"
          :class="{
            'bg-amber-600 text-white': activeTab === 'food',
            'bg-white text-amber-800': activeTab !== 'food'
          }"
          class="px-6 py-2 rounded-l-lg border border-amber-600 font-medium transition"
        >
          Food Menu
        </button>
        <button
          @click="activeTab = 'drinks'"
          :class="{
            'bg-amber-600 text-white': activeTab === 'drinks',
            'bg-white text-amber-800': activeTab !== 'drinks'
          }"
          class="px-6 py-2 rounded-r-lg border border-amber-600 font-medium transition"
        >
          Drink Menu
        </button>
      </div>

      <!-- Food Menu -->
      <div v-if="activeTab === 'food'" class="space-y-10">
        <!-- Starters Section -->
        <div>
          <h2 class="text-2xl font-bold text-amber-800 mb-6 pb-2 border-b border-amber-200">
            Starters
          </h2>
          <div class="grid md:grid-cols-2 gap-8">
            <MenuItem
              v-for="item in starters"
              :key="item.id"
              :id="item.id"
              :name="item.name"
              :menu_id="item.menu_id"
              :description="item.description"
              :price="item.price"
              :imageUrl="item.imageUrl"
              :isPopular="item.isPopular"
            />
          </div>
        </div>

        <!-- Mains Section -->
        <!-- <div>
            <h2 class="text-2xl font-bold text-amber-800 mb-6 pb-2 border-b border-amber-200">Main Courses</h2>
            <div class="grid md:grid-cols-2 gap-8">
              <MenuItem 
                v-for="item in mains"
                :key="item.name"
                :name="item.name"
                :description="item.description"
                :price="item.price"
                :isVegetarian="item.isVegetarian"
              />
            </div>
          </div>
   -->
        <!-- Desserts Section -->
        <!-- <div>
            <h2 class="text-2xl font-bold text-amber-800 mb-6 pb-2 border-b border-amber-200">Desserts</h2>
            <div class="grid md:grid-cols-2 gap-8">
              <MenuItem 
                v-for="item in desserts"
                :key="item.name"
                :name="item.name"
                :description="item.description"
                :price="item.price"
              />
            </div>
          </div> -->
      </div>

      <!-- Drink Menu -->
      <div v-if="activeTab === 'drinks'" class="space-y-10">
        <!-- Cocktails Section -->
        <div>
          <h2 class="text-2xl font-bold text-amber-800 mb-6 pb-2 border-b border-amber-200">
            Cocktails
          </h2>
          <div class="grid md:grid-cols-2 gap-8">
            <MenuItem
              v-for="item in cocktails"
              :key="item.name"
              :name="item.name"
              :description="item.description"
              :price="item.price"
              :isSignature="item.isSignature"
            />
          </div>
        </div>

        <!-- Wines Section -->
        <div>
          <h2 class="text-2xl font-bold text-amber-800 mb-6 pb-2 border-b border-amber-200">
            Wines
          </h2>
          <div class="space-y-6">
            <h3 class="text-xl font-semibold text-amber-700 mt-4">Red Wines</h3>
            <div class="grid md:grid-cols-2 gap-8">
              <MenuItem
                v-for="item in redWines"
                :key="item.name"
                :name="item.name"
                :description="item.description"
                :price="item.price"
              />
            </div>

            <h3 class="text-xl font-semibold text-amber-700 mt-6">White Wines</h3>
            <div class="grid md:grid-cols-2 gap-8">
              <MenuItem
                v-for="item in whiteWines"
                :key="item.name"
                :name="item.name"
                :description="item.description"
                :price="item.price"
              />
            </div>
          </div>
        </div>

        <!-- Non-Alcoholic Section -->
        <div>
          <h2 class="text-2xl font-bold text-amber-800 mb-6 pb-2 border-b border-amber-200">
            Non-Alcoholic
          </h2>
          <div class="grid md:grid-cols-2 gap-8">
            <MenuItem
              v-for="item in nonAlcoholic"
              :key="item.name"
              :name="item.name"
              :description="item.description"
              :price="item.price"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MenuItem from './MenuItem.vue'

const activeTab = ref('food')

// Food Menu Data
const starters = ref([
  {
    id: 1,
    name: 'Papaya Slad',
    menu_id: 28,
    description: 'Lao food',
    price: 30000,
    imageUrl: 'https://images.sbs.com.au/drupal/food/public/papaya-salad.jpg',
    isPopular: true
  },
  {
    id: 2,
    name: 'Lap',
    menu_id: 27,
    description: 'Lao food',
    imageUrl:
      'https://www.seriouseats.com/thmb/WMOA8afy7biHj6zHi7HHw9InaVU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2018__05__20180503-Guide-to-Lao-Food-Laab-Ped-Jai-Williams-1500x1125-156c9f763ed5416e9d9f355e3ffd1c21.jpg',
    price: 80000
  },
  {
    id: 3,
    name: 'Sticky Rice',
    menu_id: 26,
    description: 'Lao food',
    price: 20000,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4de6r4RvopRykcteh4EPeUnLFkXASe-OcipqYtQ962i7q56qUOIgzBYl4m8C390jDUt8&usqp=CAU',
    isPopular: true
  },
  {
    id: 4,
    name: 'Rice Vercicell Soup',
    menu_id: 29,
    description: 'Lao food',
    price: 40000,
    imageUrl:
      'https://i0.wp.com/tasteofelsewhere.com/wp-content/uploads/2021/10/6-Kao-Poon-Spicy.jpg?fit=%2C&ssl=1',
    isVegetarian: true
  }
])

const mains = ref([
  {
    name: 'Filet Mignon',
    description: '8oz grass-fed beef with roasted vegetables and red wine reduction',
    price: '$32.00'
  },
  {
    name: 'Grilled Salmon',
    description: 'Wild-caught salmon with lemon butter sauce and asparagus',
    price: '$26.50'
  },
  {
    name: 'Mushroom Risotto',
    description: 'Creamy arborio rice with wild mushrooms and parmesan',
    price: '$18.00',
    isVegetarian: true
  },
  {
    name: 'Chicken Piccata',
    description: 'Pan-seared chicken with capers, lemon, and white wine sauce',
    price: '$22.00'
  }
])

const desserts = ref([
  {
    name: 'Tiramisu',
    description: 'Classic Italian dessert with espresso-soaked ladyfingers',
    price: '$8.00'
  },
  {
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
    price: '$9.50'
  },
  {
    name: 'Crème Brûlée',
    description: 'Rich custard topped with a layer of caramelized sugar',
    price: '$8.50'
  }
])

// Drink Menu Data
const cocktails = ref([
  {
    name: 'Vue Spritz',
    description: 'Aperol, prosecco, soda water with orange slice',
    price: '$12.00',
    isSignature: true
  },
  {
    name: 'Old Fashioned',
    description: 'Bourbon, sugar, bitters with orange peel',
    price: '$14.00'
  },
  {
    name: 'Mojito',
    description: 'White rum, mint, lime, sugar, and soda water',
    price: '$11.00'
  },
  {
    name: 'Margarita',
    description: 'Tequila, triple sec, lime juice with salt rim',
    price: '$13.00'
  }
])

const redWines = ref([
  {
    name: 'Cabernet Sauvignon',
    description: 'Napa Valley, 2018 - Full-bodied with dark fruit notes',
    price: '$14/glass $58/bottle'
  },
  {
    name: 'Pinot Noir',
    description: 'Willamette Valley, 2019 - Light with cherry and earthy tones',
    price: '$12/glass $48/bottle'
  }
])

const whiteWines = ref([
  {
    name: 'Chardonnay',
    description: 'Sonoma Coast, 2020 - Buttery with hints of vanilla',
    price: '$11/glass $44/bottle'
  },
  {
    name: 'Sauvignon Blanc',
    description: 'Marlborough, 2021 - Crisp with citrus and tropical fruit',
    price: '$10/glass $40/bottle'
  }
])

const nonAlcoholic = ref([
  {
    name: 'Virgin Mojito',
    description: 'Mint, lime, sugar, and soda water',
    price: '$6.00'
  },
  {
    name: 'Iced Tea',
    description: 'House-brewed with lemon',
    price: '$4.00'
  },
  {
    name: 'Sparkling Lemonade',
    description: 'Fresh lemon juice with sparkling water',
    price: '$5.50'
  }
])
</script>
