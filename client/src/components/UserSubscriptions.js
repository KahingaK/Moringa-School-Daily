import React, { useState } from 'react';

function UserSubscriptions({ user, categories }) {
  const [unsubscribed, setUnsubscribed] = useState(false);

  const handleUnsubscribe = (subscriptionId) => {
    // Make a DELETE request to remove the subscription
    fetch(`http://localhost:3000/subscriptions/${subscriptionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('user')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Set the unsubscribed flag to true
        setUnsubscribed(true);
      })
      .catch((error) => {
        console.log(error);
        setUnsubscribed(false);
      });
  };

  return (
    <div>
      <h2>Your Subscriptions</h2>
      <ul>
      {user.subscriptions.map((subscription) => {
          const category = categories.find((category) => category.id === subscription.category_id);
          return (
            <li key={subscription.id}>
              {category.name}{' '}
              <button onClick={() => handleUnsubscribe(subscription)}>Unsubscribe</button>
            </li>
          );
        })}
      </ul>
      {unsubscribed && <p>Successfully unsubscribed from category.</p>}
    </div>
  );
}

export default UserSubscriptions;