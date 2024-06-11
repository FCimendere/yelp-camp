<h1>YelpCamp Full-stack Web Project</h1>
👉 Check out for Live Website: <a href="https://yelpcamp-wpw1.onrender.com">YelpCamp</a>

<h2>Project Summary</h2>
<p>YelpCamp is a review website for campsites, allowing users to create, review, and interact with campgrounds. Key features include user authentication, an admin role, MapBox API integration, and full CRUD capabilities for campgrounds, comments, and reviews. This project is part of Colt Steele's Web Development Bootcamp course on Udemy.</p>

<h2>Project Features</h2>
<ul>
<li><strong>Account Creation:</strong> Users can sign up and log in. Admin role is included.</li>
<li><strong>Campground Management:</strong> Users can create, edit, update, and delete campgrounds they have uploaded, complete with photos.</li>
<li><strong>Review System:</strong> Users can leave reviews per campground, with ratings between 1 and 5 stars.</li>
<li><strong>Map Integration:</strong>
  <ul>
<li>Cluster maps embedded on the main campground listing page using MapBox API.</li>
<li>Pinned maps embedded on detailed campground pages using MapBox API.</li>
  </ul>
</li>
<li><strong>Image Management:</strong> Cloudinary is used for image hosting.</li>
<li><strong>Deployment:</strong> The app is deployed to <a href="https://render.com/">Render</a>, with the database hosted on <a href="https://www.mongodb.com/products/platform/atlas-database"> MongoDB Atlas</a>.</li>
</ul>

<h2>Look at Project</h2>
<img width="1677" alt="ProjectView1" src="https://github.com/FCimendere/yelp-camp/assets/65401609/fe15876b-aa83-4067-994f-1927f4beb59c">
<img width="1677" alt="ProjectView2" src="https://github.com/FCimendere/yelp-camp/assets/65401609/36cffe2b-0088-44ed-b542-c00688ee4ec6">


<h2>Installation</h2>
<ol>
<li><strong>Clone the repository:</strong></li>
  
```
git clone https://github.com/FCimendere/yelp-camp.git
cd yelp-camp
```

<li><strong>Install dependencies:</strong></li>
  
```
npm install
```

<li><strong>Configure environment variables:</strong> Create a .env file in the root directory and add your environment variables.</li>

```
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
MAPBOX_TOKEN=your_mapbox_token
DATABASE_URL=your_database_url
USERNAME = your_cloudinary_name
SECRET = your_session_password
```

<li><strong>Run the application:</strong></li>

```
npm start
```

</ol>

<h2>Usage</h2>
<ul>
<li>Register an account or log in.</li>
<li><strong>Create new campgrounds:</strong>  Add details and images of your favorite camping spots.</li>
<li><strong>Review campgrounds:</strong>  Leave reviews and rate campgrounds you've visited.</li>
<li><strong>Explore:</strong>  Browse and comment on campgrounds created by other users.</li>
</ul>

<h2>Acknowledgements</h2>
<ol>
<li>Colt Steele for the comprehensive <a href="https://www.udemy.com/course/the-web-developer-bootcamp/" >web development bootcamp.</a></li>
<li><a href="https://www.udemy.com/">Udemy</a> for providing the platform to learn and build this project.</li>
<li><a href="https://www.mapbox.com/">Mapbox</a> for the map integration.</li>
<li><a href="https://cloudinary.com/">Cloudinary</a> for image storage and management.</li>
</ol>


Happy Camping! 🌲🏕️🌟
