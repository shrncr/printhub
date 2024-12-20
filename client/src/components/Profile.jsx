import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from "./UserContext";
import "../styles/Profile.css";

const Profile = () => {
  const { user, login } = useUser();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
  });
  const [purchases, setPurchases] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const [expandedPurchases, setExpandedPurchases] = useState({});

  useEffect(() => {
    if (!user){
      navigate('/login');
    }
    else {
      setProfileData({
        name: user.name,
        email: user.email,
        address: user.address || '',
        phoneNumber: user.phoneNumber || '',
      });
      fetchPurchases();
      if (user.isSeller) {
        fetchProducts();
      }
    }
  }, [user, navigate]);

  const fetchPurchases = async () => {
    try {
      const response = await axios.get(`https://printhubback.vercel.app/purchases/${user._id}`);
      const purchaseData = response.data;
  
      const purchasesWithDetails = await Promise.all(
        purchaseData.map(async (purchase) => {
          try {
            // Fetch item details for each listing in listingIds
            const itemPromises = purchase.listingIds.map(async (listingId) => {
              const url = `https://printhubback.vercel.app/listings/single/${listingId}`;
              const itemResponse = await axios.get(url);
              return {
                listingName: itemResponse.data.listingName, // Assuming the API returns `listingName`
                listingPrice: itemResponse.data.price, // Assuming the API returns `price`
              };
            });
  
            const items = await Promise.all(itemPromises);
  
            return {
              ...purchase,
              items, // Add the array of items with details
            };
          } catch (err) {
            console.error(`Failed to fetch item details for purchase ${purchase._id}:`, err);
            return { ...purchase, items: [] }; // Add an empty items array if there's an error
          }
        })
      );
  
      setPurchases(purchasesWithDetails);
    } catch (err) {
      console.error('Failed to fetch purchases:', err);
    }
  };
  
  

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`https://printhubback.vercel.app/users/${user._id}/products`);
      setProducts(response.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.put(`https://printhubback.vercel.app/users/${user._id}`, profileData);
      login(response.data); // Update user context
      setSuccess('Profile updated successfully.');
      setTimeout(() => {
        setSuccess('');
      }, 3000); // 3000ms = 3 seconds
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Profile update error:', err);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct) return;

    try {
      const response = await axios.post(`https://printhubback.vercel.app/users/${user._id}/products`, {
        product: newProduct,
      });
      setProducts([...products, response.data]);
      setNewProduct('');
    } catch (err) {
      console.error('Failed to add product:', err);
    }
  };
  const togglePurchaseItems = (purchaseId) => {
    setExpandedPurchases(prevState => ({
      ...prevState,
      [purchaseId]: !prevState[purchaseId],
    }));
  };

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="profile-page">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleProfileUpdate} className="profileForm">
      <h2>Profile</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={profileData.address}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={profileData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>

      <div className="purchases-section">
        <h2>Your Purchases</h2>
        <ul>
    {purchases.map((purchase, index) => (
      <li key={index}>
        <p onClick={() => togglePurchaseItems(purchase._id)} style={{ cursor: 'pointer', color: 'blue' }}>
                <strong>Purchase ID:</strong> {purchase._id} - <strong>Date:</strong> {purchase.date}
              </p>
              {expandedPurchases[purchase._id] && (
                <div>
                  <h4>Items:</h4>
                  <ul>
                    {purchase.items.map((item, idx) => (
                      <li key={idx}>
                        <p><strong>Item Name:</strong> {item.listingName}</p>
                        <p><strong>Price:</strong> ${item.listingPrice}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
    ))}
  </ul>
      </div>


      {/* {user.isSeller && (
        <div className="seller-section">
          
          <form onSubmit={handleAddProduct} className="profileForm">
          <h3>Your Products</h3>
            <input
              type="text"
              placeholder="New Product"
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
            />
            <button type="submit">Add Product</button>
          </form>
          <ul>
            {products.map((product, index) => (
              <li key={index}>{product.name}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default Profile;
