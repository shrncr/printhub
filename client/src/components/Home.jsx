import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataDisplay = () => {
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [listings, setListings] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from all collections
  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersRes, sellersRes, buyersRes, listingsRes, purchasesRes] = await Promise.all([
        axios.get('http://localhost:8082/users'),
        axios.get('http://localhost:8082/sellers'),
        axios.get('http://localhost:8082/buyers'),
        axios.get('http://localhost:8082/listings'),
        axios.get('http://localhost:8082/purchases')
      ]);

      setUsers(usersRes.data);
      setSellers(sellersRes.data);
      setBuyers(buyersRes.data);
      setListings(listingsRes.data);
      setPurchases(purchasesRes.data);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <strong>Name:</strong> {user.name}, <strong>Email:</strong> {user.email}, <strong>Phone:</strong> {user.phoneNumber}
          </li>
        ))}
      </ul>

      <h2>Sellers</h2>
      <ul>
        {sellers.map((seller) => (
          <li key={seller._id}>
            <strong>User ID:</strong> {seller.userId}, <strong>Rating:</strong> {seller.sellerRating}
          </li>
        ))}
      </ul>

      <h2>Buyers</h2>
      <ul>
        {buyers.map((buyer) => (
          <li key={buyer._id}>
            <strong>User ID:</strong> {buyer.userId}, <strong>Credit Card:</strong> {buyer.creditCard}, <strong>Address:</strong> {buyer.address}
          </li>
        ))}
      </ul>

      <h2>Listings</h2>
      <ul>
        {listings.map((listing) => (
          <li key={listing._id}>
            <strong>Name:</strong> {listing.listingName}, <strong>Price:</strong> ${listing.price}, <strong>Stock:</strong> {listing.stock}, <strong>Rating:</strong> {listing.listingRating}
            <br />
            <img src={listing.image} alt={listing.listingName} style={{ width: '100px', height: '100px' }} />
            <p>{listing.listingDesc}</p>
          </li>
        ))}
      </ul>

      <h2>Purchases</h2>
      <ul>
        {purchases.map((purchase) => (
          <li key={purchase._id}>
            <strong>User ID:</strong> {purchase.userId}, <strong>Purchase ID:</strong> {purchase.purchaseId}
            <br />
            <strong>Listing IDs:</strong> {purchase.listingIds.join(', ')}
            <br />
            <strong>Card Digits:</strong> **** **** **** {purchase.cardDigits}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataDisplay;
