import { useState } from "react";
import axios from "axios";
import "./index.css";

const API = import.meta.env.VITE_API_URL;

export default function App() {
  const [page, setPage] = useState("home");
  const [tripDays, setTripDays] = useState("1");
  const [submitted, setSubmitted] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [tripDestination, setTripDestination] = useState("");
  const [form, setForm] = useState({ date: "" });
  const [travellerName, setTravellerName] = useState("");
  const [travellerList, setTravellerList] = useState([]);
  const [travellerAge, setTravellerAge] = useState("");
  const [numPeople, setNumPeople] = useState("");
 const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  const bookingData = {
    customerName: travellerList[0]?.name || "Guest",
    customerEmail: email,
    contactNumber: contact,
    destination: tripDestination,
    tripDuration: tripDays,
    numberOfPeople: Number(numPeople),
    travellers: travellerList,
    travelDate: new Date(form.date),
    specialRequests: "",
  };


  try {
    await axios.post(`${API}/api/bookings`, bookingData);
    setSubmitted(true);
    setPage("confirmation");
  } catch (error) {
  console.error("Booking error:", error.response?.data || error.message);

  alert(
    error.response?.data?.error ||
    error.response?.data?.message ||
    "Booking failed"
  );
}

};

const handleFeedbackSubmit = async (e) => {
  e.preventDefault();

  const feedbackData = {
    email: e.target.email.value,
    message: e.target.message.value,
  };

  try {
    await axios.post(`${API}/api/feedback`, feedbackData);
    alert("Feedback submitted successfully!");
    e.target.reset();
  } catch (error) {
    console.error(error);
    alert("Failed to submit feedback");
  }
};

  return (
    <div className="app">
      <nav className="navbar">
          <img
           src="https://tse2.mm.bing.net/th/id/OIP.U5LR7kR6TBoiXbVk1BVbzwHaG8?pid=Api&P=0&h=180"
            alt="Book & Go Logo"
             className="logo"
              onClick={() => setPage("home")}
               />
        <ul>
          <li onClick={() => setPage("home")}>Home</li>
          <li onClick={() => setPage("about")}>About Us</li>
          <li onClick={() => setPage("feedback")}>Feedback Form</li>
          <li onClick={() => setPage("details")}>Details</li>
          <li onClick={() => setPage("booking")}>Booking Form</li>
        </ul>
      </nav>
      
      <h1>✈️Book And Go🌍</h1>
      
      {page === "home" && (
        <section className="home">
          <h2>📍Explore Famous Places</h2>

           <div className="state-selector">
      <label>Select Your City:</label>
      <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
        <option value="">-- Select --</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Chennai">Chennai</option>
        <option value="Hyderabad">Hyderabad</option>
      </select>
    </div>

          <div className="carousel">
            <img src="https://www.fabhotels.com/blog/wp-content/uploads/2018/09/Gateway-of-India-1.jpg" alt="Place 1" />
            <img src="http://cdn.wionews.com/sites/default/files/2023/06/18/360332-13.jpg" alt="Place 2" />
            <img src="https://irisholidays.com/keralatourism/wp-content/uploads/2018/12/trivandrum.jpg" alt="Place 3" />
            <img src="https://www.fabhotels.com/blog/wp-content/uploads/2022/01/cliched-destinations-in-india-feature-image-600X400.jpg" alt="Place 4" />
            <img src="https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2024/01/04/a78cca898cea0087e9d53674e5e1914f_1000x1000.jpg" alt="Place 5" />
            <img src="https://www.holidify.com/images/cmsuploads/compressed/fh_20190728235947.jpg" alt="Place 6" />
            <img src="https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/mumbai-maharashtra.jpg" alt="Place 7" />
            <img src="https://tse4.mm.bing.net/th/id/OIP.Fk1n49rz1QoswU9LWFubWAHaEc?pid=Api&P=0&h=180" alt="Place 8" />
            <img src="https://tse2.mm.bing.net/th/id/OIP.GNF9j4KdHKx3EBIVBOivtwHaFL?pid=Api&P=0&h=180" alt="Place 9" />
            <img src="https://tse2.mm.bing.net/th/id/OIP.yUZLs186Msf6gqwb9GaV7wHaEK?pid=Api&P=0&h=180" alt="Place 10" />
          </div>
        </section>
      )}
      

      {page === "about" && (
        <section className="about">
          <h2>🌟About Us🌟</h2>
          <p>
            Welcome to Book & Go, your trusted travel companion for unforgettable short trips! 🌍
            We specialize in 1-day, 2-day, and 3-day tour packages that are carefully designed to give you the best travel experiences without the stress. From local getaways to cultural adventures, we offer affordable, all-inclusive packages that cover travel, accommodation, meals, and more.
            <p> With a passion for exploration and a love for service, our goal is to make your journey smooth, exciting, and truly memorable. Whether you're traveling with family, friends, or solo — just pack your bags, and we'll handle the rest. 🎒✈️</p>
            Book & Go is a travel booking platform offering 1 to 3 day curated tour
            experiences to top destinations with local guides and all-inclusive packages.

          </p>
          <h3>💬What Our Passengers Say:</h3>
          <ul>
            <li>🗣️"Wonderful experience! Highly recommended."
              ⭐⭐⭐⭐⭐ – Priya</li>
            <li>🗣️"Very smooth trip and great guide!" ⭐⭐⭐⭐– Rahul</li>
            <li>🗣️"Well-organized and fun."⭐⭐⭐⭐- Sneha</li>
          </ul>
        </section>
      )}

      {page === "feedback" && (
        <div className="feedback-form">
          <div className="feedback-container">
             <h2>Feedback Form</h2>
          <form onSubmit={handleFeedbackSubmit}>
            <input type="email" name="email" placeholder="Your Email" required/>
            <textarea name="message" placeholder="Your Message" required></textarea>

            <button type="submit">Submit</button>
          </form>
          </div>
        </div>
      )}

      {page === "details" && selectedState? (
        <section className="trip-details">
          <h2>Trip Details for {selectedState} - By BUS</h2>
          <div className="trip-options">
            <label>
              <input
                type="radio"
                name="duration"
                value="1"
                checked={tripDays === "1"}
                onChange={() => setTripDays("1")}
              />
              1 Day Trip
            </label>
            <label>
              <input
                type="radio"
                name="duration"
                value="2"
                checked={tripDays === "2"}
                onChange={() => setTripDays("2")}
              />
              2 Days Trip
            </label>
            <label>
              <input
                type="radio"
                name="duration"
                value="3"
                checked={tripDays === "3"}
                onChange={() => setTripDays("3")}
              />
              3 Days Trip
            </label>
          </div>

          <div className="itinerary">
            <h4>It follows:</h4>
              {selectedState === "Bangalore" && tripDays === "1" && (
                <>
                 <div className="trip-plan">
                  <h2>🌞 1-Day Trip Plan <strong>From:</strong> Bangalore → <strong>To:</strong> Mysore (5 AM to 10 PM)</h2>
                   <div className="sub-plan">
                  <ul>
                    <li>🕔 <strong>5:00 AM:</strong> Departure from Majestic, Bangalore - A/C bus or tempo traveler</li>
                    <li>☕ <strong>7:30 AM:</strong> Breakfast at Adyar Anand Bhavan (Mandya)</li>
                    <li>🏰 <strong>9:00 AM:</strong> Mysore Palace - Guided tour & photos</li>
                    <li>🌺 <strong>11:00 AM:</strong> Brindavan Gardens - Floral gardens & boating</li>
                    <li>🍛 <strong>1:00 PM:</strong> Lunch at RRR/Dasaprakash (local cuisine)</li>
                    <li>🐒 <strong>2:30 PM:</strong> Chamundi Hills - Temple + city view</li>
                    <li>🎨 <strong>4:00 PM:</strong> Optional: Zoo or Art Gallery</li>
                    <li>🛍️ <strong>5:30 PM:</strong> Devaraja Market - Shopping & sweets</li>
                    <li>🍴 <strong>7:00 PM:</strong> Dinner at Kamat Lokaruchi or Mandya</li>
                    <li>🚐 <strong>10:00 PM:</strong> Return to Bangalore & drop-off</li>
                     </ul>
                     <p className="price">💰 Price: ₹999 per person</p>
                     <p className="price">💰 Child: ₹899 per person(below 5years)</p>
                     <p>✅ Includes: Travel, Breakfast, Trek Guide, Entry Fee</p>
                             <button onClick={() => {
  setTripDestination("Mysore");
  setPage("booking");
}}>Book Now</button>
                     </div>
                     </div>


                     <div className="trip-plan">
      <h2>⛰️ 1-Day Adventure Trip <strong>From:</strong> Bangalore → <strong>To:</strong> Savandurga Hill (5:30 AM to 10 PM)</h2>
      <div className="sub-plan">
        <ul>
          <li>🕕 <strong>5:30 AM:</strong> Departure from Bangalore (Majestic/Shantinagar)</li>
          <li>☕ <strong>7:00 AM:</strong> Breakfast en route (Magadi Road)</li>
          <li>🥾 <strong>8:00 AM:</strong> Trek starts – moderate climb with guide</li>
          <li>📸 <strong>11:00 AM:</strong> Reach summit – photos, rest</li>
          <li>⬇️ <strong>11:30 AM:</strong> Descent begins</li>
          <li>🍛 <strong>1:30 PM:</strong> Lunch at a local restaurant</li>
          <li>🛕 <strong>2:30 PM:</strong> Optional: Visit to temple at base</li>
          <li>🛍️ <strong>4:00 PM:</strong> Local snack stop on return</li>
          <li>🚐 <strong>6:00 PM:</strong> Return to Bangalore</li>
        </ul>
        <p className="price">💰 Price: ₹899 per person</p>
        <p className="price">💰 Child: ₹699 per person (below 5 years)</p>
        <p>✅ Includes: Travel, Breakfast, Trek Guide, Entry Fee</p>
        <button onClick={() => {
  setTripDestination("Savandurga Hill");
  setPage("booking");
}}>Book Now</button>
      </div>
    </div>
  </>
            )}
            {selectedState === "Bangalore" && tripDays === "2" && (
              <>
  <div className="trip-plan">
    <h2>🏞️ 2-Day Trip From Bangalore → Coorg</h2>
    <div className="sub-plan">
      <ul>
        <li>🕗 <strong>Day 1 - 6:00 AM:</strong> Departure from Bangalore</li>
        <li>🏞️ <strong>11:00 AM:</strong> Visit Abbey Falls</li>
        <li>🌿 <strong>1:00 PM:</strong> Lunch at Coorg Cuisine</li>
        <li>🕍 <strong>3:00 PM:</strong> Visit Madikeri Fort</li>
        <li>🏡 <strong>6:00 PM:</strong> Check-in to Homestay + Campfire</li>
        <li>🍽️ <strong>8:00 PM:</strong> Dinner at homestay</li>
        <li>🌅 <strong>Day 2 - 7:00 AM:</strong> Breakfast + Talacauvery Temple visit</li>
        <li>🛍️ <strong>10:00 AM:</strong> Local market shopping</li>
        <li>🍛 <strong>1:00 PM:</strong> Lunch & depart to Bangalore</li>
        <li>🏠 <strong>7:00 PM:</strong> Reach Bangalore</li>
      </ul>
      <p className="price">💰 Price: ₹2499 per person</p>
      <p className="price">💰 Child: ₹1899 per person (below 5 years)</p>
      <p>✅ Includes: Travel, Accommodation, Meals, Entry Fees</p>
      <button onClick={() => {
        setTripDestination("Coorg");
        setPage("booking");
      }}>Book Now</button>
    </div>
  </div>

  <div className="trip-plan">
      <h2>🌄 2-Day Trip From Bangalore → Chikmagalur</h2>
      <div className="sub-plan">
        <ul>
          <li>🕗 <strong>Day 1 - 6:00 AM:</strong> Departure from Bangalore</li>
          <li>🌿 <strong>11:00 AM:</strong> Coffee estate walk with local guide</li>
          <li>🍛 <strong>1:00 PM:</strong> Lunch at local Malnad restaurant</li>
          <li>🏞️ <strong>3:00 PM:</strong> Mullayanagiri Peak visit</li>
          <li>🏕️ <strong>7:00 PM:</strong> Bonfire & Dinner at resort</li>
          <li>🛏️ <strong>Night:</strong> Overnight stay at plantation resort</li>
          <li>🌅 <strong>Day 2 - 6:30 AM:</strong> Sunrise trek + breakfast</li>
          <li>💦 <strong>10:00 AM:</strong> Visit Hebbe Falls</li>
          <li>🛍️ <strong>1:00 PM:</strong> Lunch & coffee shopping</li>
          <li>🚐 <strong>2:30 PM:</strong> Return journey to Bangalore</li>
          <li>🏠 <strong>9:00 PM:</strong> Arrival at Bangalore</li>
        </ul>
        <p className="price">💰 Price: ₹2599 per person</p>
        <p className="price">💰 Child: ₹1999 per person (below 5 years)</p>
        <p>✅ Includes: Travel, Accommodation, Meals, Entry Fees, Trek Guide</p>
        <button onClick={() => {
          setTripDestination("Chikmagalur");
          setPage("booking");
        }}>Book Now</button>
      </div>
    </div>
  </>
)}

{selectedState === "Bangalore" && tripDays === "3" && (
  <>
  <div className="trip-plan">
    <h2>🏖️ 3-Day Trip From Bangalore → Gokarna</h2>
    <div className="sub-plan">
      <ul>
        <li>🕘 <strong>Day 1 - 9:00 PM:</strong> Overnight journey from Bangalore</li>
        <li>🌅 <strong>Day 2 - 6:00 AM:</strong> Arrival at Gokarna + Hotel Check-in</li>
        <li>🏝️ <strong>9:00 AM:</strong> Beach Hopping: Om Beach, Kudle Beach</li>
        <li>🍛 <strong>1:00 PM:</strong> Lunch at Namaste Cafe</li>
        <li>🛕 <strong>4:00 PM:</strong> Visit Mahabaleshwar Temple</li>
        <li>🔥 <strong>7:00 PM:</strong> Bonfire & Dinner at beach resort</li>
        <li>🌅 <strong>Day 3 - 7:00 AM:</strong> Sunrise trek + breakfast</li>
        <li>🛍️ <strong>11:00 AM:</strong> Shopping at local markets</li>
        <li>🚌 <strong>2:00 PM:</strong> Return journey to Bangalore</li>
        <li>🏠 <strong>9:00 PM:</strong> Reach Bangalore</li>
      </ul>
      <p className="price">💰 Price: ₹3499 per person</p>
      <p className="price">💰 Child: ₹2599 per person (below 5 years)</p>
      <p>✅ Includes: Travel, Accommodation, Meals, Trek Guide</p>
      <button onClick={() => {
        setTripDestination("Gokarna");
        setPage("booking");
      }}>Book Now</button>
    </div>
  </div>

  <div className="trip-plan">
      <h2>🍃 3-Day Trip From Bangalore → Ooty & Coonoor</h2>
      <div className="sub-plan">
        <ul>
          <li>🌃 <strong>Day 1 - 10:00 PM:</strong> Night departure from Bangalore</li>
          <li>🌄 <strong>Day 2 - 6:00 AM:</strong> Reach Ooty + Check-in</li>
          <li>🏞️ <strong>9:00 AM:</strong> Visit Ooty Lake, Botanical Garden</li>
          <li>🧺 <strong>1:00 PM:</strong> Lunch + Relax at hotel</li>
          <li>🚞 <strong>4:00 PM:</strong> Nilgiri Mountain Railway ride</li>
          <li>🏨 <strong>7:00 PM:</strong> Dinner + overnight stay</li>
          <li>🌄 <strong>Day 3 - 7:00 AM:</strong> Breakfast + leave for Coonoor</li>
          <li>🌸 <strong>10:00 AM:</strong> Sims Park, Dolphin Nose</li>
          <li>🛍️ <strong>12:30 PM:</strong> Local tea shop & lunch</li>
          <li>🚐 <strong>2:30 PM:</strong> Return to Bangalore</li>
          <li>🌙 <strong>9:30 PM:</strong> Reach Bangalore</li>
        </ul>
        <p className="price">💰 Price: ₹3699 per person</p>
        <p className="price">💰 Child: ₹2899 per person (below 5 years)</p>
        <p>✅ Includes: Travel, Hotel, Meals, Toy Train, Entry Fees</p>
        <button onClick={() => {
          setTripDestination("Ooty & Coonoor");
          setPage("booking");
        }}>Book Now</button>
      </div>
    </div>
  </>
)}

     {selectedState === "Chennai" && tripDays === "1" && (
  <>
    {/* Mahabalipuram One-Day Trip */}
    <div className="trip-plan">
      <h2>🗿 1-Day Trip From Chennai → Mahabalipuram</h2>
      <div className="sub-plan">
        <ul>
          <li>🕘 <strong>7:00 AM:</strong> Depart from Chennai</li>
          <li>🛕 <strong>9:00 AM:</strong> Visit Shore Temple & Arjuna’s Penance</li>
          <li>🧗 <strong>11:00 AM:</strong> Krishna’s Butter Ball</li>
          <li>🍽️ <strong>1:00 PM:</strong> Lunch at Moonrakers</li>
          <li>🌊 <strong>3:00 PM:</strong> Relax on the beach</li>
          <li>🏠 <strong>6:00 PM:</strong> Return to Chennai</li>
        </ul>
        <p className="price">💰 ₹1199 per person (₹899 for kids below 5)</p>
        <button onClick={() => {
          setTripDestination("Mahabalipuram");
          setPage("booking");
        }}>Book Now</button>
      </div>
    </div>

    {/* Vedanthangal Bird Sanctuary */}
    <div className="trip-plan">
      <h2>🦜 1-Day Trip From Chennai → Vedanthangal Bird Sanctuary</h2>
      <div className="sub-plan">
        <ul>
          <li>🕘 <strong>6:00 AM:</strong> Depart from Chennai</li>
          <li>🦢 <strong>8:00 AM:</strong> Explore Bird Sanctuary (best for bird lovers)</li>
          <li>🍽️ <strong>12:00 PM:</strong> Lunch at local restaurant</li>
          <li>🏞️ <strong>2:00 PM:</strong> Scenic walk + local temples nearby</li>
          <li>🏠 <strong>6:00 PM:</strong> Return to Chennai</li>
        </ul>
        <p className="price">💰 ₹999 per person (₹749 for kids below 5)</p>
        <button onClick={() => {
          setTripDestination("Vedanthangal Bird Sanctuary");
          setPage("booking");
        }}>Book Now</button>
      </div>
    </div>
  </>
)}

{selectedState === "Chennai" && tripDays === "2" && (
  <>
    {/* Pondicherry Weekend Trip */}
    <div className="trip-plan">
      <h2>🌊 2-Day Trip From Chennai → Pondicherry</h2>
      <div className="sub-plan">
        <ul>
          <li>🕘 <strong>Day 1 - 7:00 AM:</strong> Depart from Chennai</li>
          <li>🏖️ <strong>10:00 AM:</strong> Promenade Beach & French Colony walk</li>
          <li>🧘 <strong>1:00 PM:</strong> Visit Aurobindo Ashram & Auroville</li>
          <li>🍛 <strong>4:00 PM:</strong> Local café dinner and stay overnight</li>
          <li>🌄 <strong>Day 2 - 8:00 AM:</strong> Paradise Beach + boating</li>
          <li>🛍️ <strong>12:00 PM:</strong> Local shopping & lunch</li>
          <li>🏠 <strong>5:00 PM:</strong> Return to Chennai</li>
        </ul>
        <p className="price">💰 ₹1999 per person (₹1399 for kids below 5)</p>
        <button onClick={() => {
          setTripDestination("Pondicherry");
          setPage("booking");
        }}>Book Now</button>
      </div>
    </div>

    {/* Yelagiri Hills Escape */}
    <div className="trip-plan">
      <h2>⛰️ 2-Day Trip From Chennai → Yelagiri Hills</h2>
      <div className="sub-plan">
        <ul>
          <li>🕘 <strong>Day 1 - 6:00 AM:</strong> Depart from Chennai</li>
          <li>🌄 <strong>10:00 AM:</strong> Reach Yelagiri, visit Nature Park</li>
          <li>🛶 <strong>1:00 PM:</strong> Boating at Punganoor Lake</li>
          <li>🧗 <strong>4:00 PM:</strong> Trekking or Zipline Adventure</li>
          <li>🔥 <strong>7:00 PM:</strong> Campfire and local dinner</li>
          <li>🌤️ <strong>Day 2 - 8:00 AM:</strong> Jalagamparai Waterfalls + breakfast</li>
          <li>🍛 <strong>1:00 PM:</strong> Lunch and checkout</li>
          <li>🏠 <strong>6:00 PM:</strong> Return to Chennai</li>
        </ul>
        <p className="price">💰 ₹2199 per person (₹1499 for kids below 5)</p>
        <button onClick={() => {
          setTripDestination("Yelagiri Hills");
          setPage("booking");
        }}>Book Now</button>
      </div>
    </div>
  </>
)}

{selectedState === "Chennai" && tripDays === "3" && (
  <>
    {/* Kodaikanal Trip */}
    <div className="trip-plan">
      <h2>🏞️ 3-Day Trip From Chennai → Kodaikanal</h2>
      <div className="sub-plan">
        <ul>
          <li>🌃 <strong>Day 1 - 9:00 PM:</strong> Overnight journey from Chennai</li>
          <li>🌄 <strong>Day 2 - 7:00 AM:</strong> Check-in at Kodai hotel</li>
          <li>🌲 <strong>10:00 AM:</strong> Coaker’s Walk, Bryant Park</li>
          <li>🧺 <strong>1:00 PM:</strong> Picnic lunch by Kodai Lake</li>
          <li>🚣 <strong>4:00 PM:</strong> Boating + Shopping</li>
          <li>🏨 <strong>7:00 PM:</strong> Dinner & Stay</li>
          <li>🌄 <strong>Day 3 - 8:00 AM:</strong> Pine Forest, Guna Caves</li>
          <li>🍽️ <strong>1:00 PM:</strong> Lunch + Return journey</li>
          <li>🌃 <strong>9:00 PM:</strong> Arrival in Chennai</li>
        </ul>
        <p className="price">💰 ₹3499 per person (₹2699 for kids below 5)</p>
        <button onClick={() => {
          setTripDestination("Kodaikanal");
          setPage("booking");
        }}>Book Now</button>
      </div>
    </div>

    {/* Yercaud Trip */}
    <div className="trip-plan">
      <h2>🌿 3-Day Trip From Chennai → Yercaud</h2>
      <div className="sub-plan">
        <ul>
          <li>🌃 <strong>Day 1 - 10:00 PM:</strong> Start from Chennai (overnight)</li>
          <li>🌄 <strong>Day 2 - 7:00 AM:</strong> Check-in at Hill Resort</li>
          <li>🗻 <strong>10:00 AM:</strong> Lady's Seat, Pagoda Point</li>
          <li>🍽️ <strong>1:00 PM:</strong> Lunch at hotel</li>
          <li>🚣 <strong>4:00 PM:</strong> Boating at Yercaud Lake</li>
          <li>🔥 <strong>7:00 PM:</strong> Campfire + Dinner</li>
          <li>🌅 <strong>Day 3 - 8:00 AM:</strong> Botanical Garden + breakfast</li>
          <li>🛍️ <strong>12:00 PM:</strong> Local shopping + return trip</li>
          <li>🏠 <strong>9:00 PM:</strong> Back to Chennai</li>
        </ul>
        <p className="price">💰 ₹3299 per person (₹2499 for kids below 5)</p>
        <button onClick={() => {
          setTripDestination("Yercaud");
          setPage("booking");
        }}>Book Now</button>
      </div>
    </div>
  </>
)}

{selectedState === "Hyderabad" && tripDays === "1" && (
  <>
    {/* Ramoji Film City Trip */}
    <div className="trip-plan">
      <h2>🎬 1-Day Trip From Hyderabad → Ramoji Film City</h2>
      <div className="sub-plan">
        <ul>
          <li>🕘 <strong>8:00 AM:</strong> Depart from Hyderabad</li>
          <li>🏰 <strong>9:30 AM:</strong> Arrive at Ramoji Film City</li>
          <li>🎥 <strong>10:00 AM:</strong> Film set tour + adventure zone</li>
          <li>🍱 <strong>1:00 PM:</strong> Lunch at in-house restaurant</li>
          <li>🎢 <strong>2:30 PM:</strong> Live shows, eco zones, gardens</li>
          <li>📸 <strong>5:30 PM:</strong> Photo session + souvenirs</li>
          <li>🏠 <strong>7:00 PM:</strong> Return to Hyderabad</li>
        </ul>
        <p className="price">💰 ₹1299 per person (₹999 for kids below 5)</p>
        <button onClick={() => {
          setTripDestination("Ramoji Film City");
          setPage("booking");
        }}>Book Now</button>
      </div>
    </div>

    {/* Ananthagiri Hills Trip */}
    <div className="trip-plan">
      <h2>🌄 1-Day Trip From Hyderabad → Ananthagiri Hills</h2>
      <div className="sub-plan">
        <ul>
          <li>🕘 <strong>6:00 AM:</strong> Depart from Hyderabad</li>
          <li>🌳 <strong>8:00 AM:</strong> Reach Ananthagiri for nature walk</li>
          <li>🧘 <strong>10:00 AM:</strong> Temple visit + meditation spot</li>
          <li>🍛 <strong>1:00 PM:</strong> Local lunch at forest cottage</li>
          <li>🚣 <strong>3:00 PM:</strong> Lake viewpoint + optional boating</li>
          <li>🏠 <strong>6:30 PM:</strong> Return to Hyderabad</li>
        </ul>
        <p className="price">💰 ₹1199 per person (₹899 for kids below 5)</p>
        <button onClick={() => {
          setTripDestination("Ananthagiri Hills");
          setPage("booking");
        }}>Book Now</button>
      </div>
    </div>
  </>
)}

            {selectedState === "Hyderabad" && tripDays === "2" && (
  <>
    {/* Srisailam Trip */}
    <div className="trip-plan">
      <h2>🛕 2-Day Trip From Hyderabad → Srisailam</h2>
      <div className="sub-plan">
        <ul>
          <li>🕘 <strong>Day 1 - 6:00 AM:</strong> Depart from Hyderabad</li>
          <li>🌉 <strong>9:00 AM:</strong> Stop at Srisailam Dam Viewpoint</li>
          <li>🛕 <strong>11:00 AM:</strong> Mallikarjuna Temple Darshan</li>
          <li>🍽️ <strong>1:00 PM:</strong> Lunch at local Andhra restaurant</li>
          <li>🌄 <strong>4:00 PM:</strong> Ropeway ride to Pathala Ganga</li>
          <li>🔥 <strong>7:00 PM:</strong> Check-in, dinner & campfire stay</li>
          <li>🌄 <strong>Day 2 - 7:00 AM:</strong> Tiger Reserve Safari</li>
          <li>🍽️ <strong>12:00 PM:</strong> Lunch & return journey</li>
          <li>🏠 <strong>6:00 PM:</strong> Arrival at Hyderabad</li>
        </ul>
        <p className="price">💰 ₹2299 per person (₹1699 for kids below 5)</p>
        <button onClick={() => {
          setTripDestination("Srisailam");
          setPage("booking");
        }}>Book Now</button>
      </div>
    </div>

    {/* Nagarjuna Sagar Trip */}
    <div className="trip-plan">
      <h2>🏞️ 2-Day Trip From Hyderabad → Nagarjuna Sagar</h2>
      <div className="sub-plan">
        <ul>
          <li>🕘 <strong>Day 1 - 7:00 AM:</strong> Depart from Hyderabad</li>
          <li>🌊 <strong>10:30 AM:</strong> Visit Nagarjuna Sagar Dam</li>
          <li>🪨 <strong>1:00 PM:</strong> Lunch & Ethipothala Falls visit</li>
          <li>🏨 <strong>4:00 PM:</strong> Check-in at lake resort</li>
          <li>🌅 <strong>6:00 PM:</strong> Sunset view + dinner</li>
          <li>🌄 <strong>Day 2 - 8:00 AM:</strong> Nagarjunakonda Island museum trip</li>
          <li>🍛 <strong>1:00 PM:</strong> Lunch & check-out</li>
          <li>🏠 <strong>5:00 PM:</strong> Return to Hyderabad</li>
        </ul>
        <p className="price">💰 ₹2199 per person (₹1599 for kids below 5)</p>
        <button onClick={() => {
          setTripDestination("Nagarjuna Sagar");
          setPage("booking");
        }}>Book Now</button>
      </div>
    </div>
  </>
)}

{selectedState === "Hyderabad" && tripDays === "3" && (
  <>
    {/* Hyderabad to Hampi */}
    <div className="trip-plan">
      <h2>🏛️ 3-Day Trip From Hyderabad → Hampi</h2>
      <div className="sub-plan">
        <ul>
          <li>🕘 <strong>Day 1 - 6:00 AM:</strong> Depart from Hyderabad</li>
          <li>🏨 <strong>1:00 PM:</strong> Check-in at Hampi hotel + lunch</li>
          <li>🏯 <strong>3:00 PM:</strong> Visit Virupaksha Temple & Hampi Bazaar</li>
          <li>🌇 <strong>6:30 PM:</strong> Sunset at Hemakuta Hill</li>

          <li>🕌 <strong>Day 2 - 8:00 AM:</strong> Royal Enclosure, Elephant Stables, Lotus Mahal</li>
          <li>🌄 <strong>1:00 PM:</strong> Lunch + Tungabhadra River boating</li>
          <li>🧭 <strong>4:00 PM:</strong> Vittala Temple & Stone Chariot</li>
          <li>🔥 <strong>8:00 PM:</strong> Cultural evening + dinner</li>

          <li>🌅 <strong>Day 3 - 9:00 AM:</strong> Breakfast + relax</li>
          <li>🛍️ <strong>11:00 AM:</strong> Local shopping & return journey</li>
          <li>🏠 <strong>7:00 PM:</strong> Reach Hyderabad</li>
        </ul>
        <p className="price">💰 ₹3699 per person (₹2499 for kids below 5)</p>
        <button onClick={() => {
          setTripDestination("Hampi");
          setPage("booking");
        }}>Book Now</button>
      </div>
    </div>

    {/* Hyderabad to Araku Valley & Vizag */}
    <div className="trip-plan">
      <h2>🚞 3-Day Trip From Hyderabad → Araku Valley & Vizag</h2>
      <div className="sub-plan">
        <ul>
          <li>🚆 <strong>Day 1 - 6:00 AM:</strong> Train from Hyderabad to Vizag</li>
          <li>🌊 <strong>2:00 PM:</strong> RK Beach, Submarine Museum, evening at Rushikonda</li>
          <li>🏨 <strong>8:00 PM:</strong> Hotel check-in + dinner</li>

          <li>🚞 <strong>Day 2 - 6:00 AM:</strong> Scenic train ride to Araku Valley</li>
          <li>🌿 <strong>10:00 AM:</strong> Coffee Museum + Tribal Museum</li>
          <li>🕳️ <strong>1:00 PM:</strong> Visit Borra Caves + Lunch</li>
          <li>🌇 <strong>6:00 PM:</strong> Return to Vizag</li>

          <li>🌄 <strong>Day 3 - 8:00 AM:</strong> Simhachalam Temple visit</li>
          <li>🛍️ <strong>11:00 AM:</strong> Shopping + lunch</li>
          <li>🚆 <strong>3:00 PM:</strong> Return train to Hyderabad</li>
        </ul>
        <p className="price">💰 ₹3899 per person (₹2799 for kids below 5)</p>
        <button onClick={() => {
          setTripDestination("Araku & Vizag");
          setPage("booking");
        }}>Book Now</button>
      </div>
    </div>
  </>
)}
          </div>

        </section>
        
      ): page === "details" ? (
  <div className="trip-details">
    <h2>Please select a city from Home before viewing trip details.</h2>
  </div>
) : null
}


      {page === "booking" && (
        <section className="booking-form">
          <h2>Booking Form</h2>
          <p><strong>Destination:</strong> {tripDestination}</p>
          <form onSubmit={handleSubmit}>
            <label>Trip Duration:</label>
            <select value={tripDays} onChange={(e) => setTripDays(e.target.value)}>
              <option value="1">1 Day</option>
              <option value="2">2 Days</option>
              <option value="3">3 Days</option>
            </select>
            <label>Trip Date:</label>
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
      />

      <input
  type="number"
  placeholder="Number of People"
  value={numPeople}
  onChange={(e) => setNumPeople(e.target.value)}
  required
/>

           <label>All Travellers:</label>
<div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
  <input
    type="text"
    value={travellerName}
    onChange={(e) => setTravellerName(e.target.value)}
    placeholder="Enter Name"
  />
  <input
    type="number"
    value={travellerAge}
    onChange={(e) => setTravellerAge(e.target.value)}
    placeholder="Enter Age"
  />
  <button
  type="button"
  onClick={() => {
    if (travellerName.trim() === "" || travellerAge.trim() === "") {
      alert("Please enter both name and age.");
      return;
    }

    if (travellerList.length >= parseInt(numPeople)) {
      alert("You can only add names for " + numPeople + " people.");
      return;
    }

    setTravellerList([
      ...travellerList,
      { name: travellerName.trim(), age: Number(travellerAge) },
    ]);
    setTravellerName("");
    setTravellerAge("");
  }}
>
  Add
</button>
</div>

{/* Display list of travellers with name & age */}
<ul>
  {travellerList.map((traveller, index) => (
    <li key={index}>
      👤 {traveller.name} - Age: {traveller.age}
    </li>
  ))}
</ul>

            <input
  type="tel"
  placeholder="Contact Number"
  value={contact}
  onChange={(e) => setContact(e.target.value)}
  required
/>
            <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>
            <button type="submit">Book Now</button>
          </form>
        </section>
      )}

      {page === "confirmation" && submitted && (
        <section className="confirmation">
          <h2>Booking Confirmed!</h2>
          <p>Your {tripDays}-day trip to {tripDestination} is booked. Thank you for choosing Book & Go!</p>

        </section>
      )}
      <footer className="footer">
        <p>Follow us:</p>
        <div className="social-icons">
          <a href="https://facebook.com/your-page" target="_blank" rel="noopener noreferrer">
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
    alt="Facebook"
    className="icon"
  />
</a>

<a href="https://instagram.com/your-page" target="_blank" rel="noopener noreferrer">
  <img
    src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
    alt="Instagram"
    className="icon"
  />
</a>

<a href="https://twitter.com/your-twitter" target="_blank" rel="noopener noreferrer">
  <img
    src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
    alt="Twitter"
    className="icon"
  />
</a>

        </div>
      </footer>
    </div>
  );
}
