import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  // const [userId, setUserId] = useState("");
  const [users, setUsers] = useState({});

  // useEffect(() => {
  //   fetch("api/orders").then((res) => {
  //     res.json().then((order) => {
  //       const sortedOrders = order.sort(
  //         (b, a) => new Date(b.timestamp) - new Date(a.timestamp)
  //       );
  //       setOrders(sortedOrders);

  //       const usersData = {};

  //       const userId = order.buyerId;
  //       console.log(userId);

  //       fetch(`api/user?buyerId=${userId}`).then((res) => {
  //         res.json().then((users) => {
  //           usersData[userId] = users;
  //         });
  //       });

  //       setUsers(usersData);
  //       console.log(userId);

  //       // const buyerId = order.map((order) => order.buyerId);
  //       // setUserId(buyerId);
  //     });
  //   });

  //   // fetch("api/users").then((res) => {
  //   //   res.json().then((users) => {
  //   //     if (userId != "") {
  //   //       const user = users.find((u) => u._id === userId);
  //   //       setUser(user);

  //   //       console.log(user);
  //   //     }
  //   //   });
  //   // });
  // }, [orders, users]);

  useEffect(() => {
    const fetchOrdersAndUsers = async () => {
      try {
        // Fetch orders
        const ordersResponse = await fetch("/api/orders");
        if (!ordersResponse.ok) {
          throw new Error("Failed to fetch orders");
        }
        const ordersData = await ordersResponse.json();
        setOrders(ordersData);

        // Fetch users for each order
        const usersData = {};
        for (const order of ordersData) {
          const userId = order.buyerId;

          if (!usersData[userId]) {
            const userResponse = await fetch(`/api/user?_id=${userId}`);

            if (!userResponse.ok) {
              throw new Error("Failed to fetch user");
            }

            const userData = await userResponse.json();
            console.log(userData);
            usersData[userId] = userData;
          }
        }
        setUsers(usersData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchOrdersAndUsers();
  }, []);

  return (
    <section className="p-5 max-w-3xl mx-auto">
      {orders.map((order) => (
        <>
          <div key={order._id} className="flex gap-3">
            <p>{order.totalPrice}</p>
            {/* <p onClick={() => setUserId(order.buyerId)}>buyer</p> */}
            <p>User: {users[order.buyerId]?.email || "Unknown User"}</p>
            <div>
              {order.cart?.map((item) => (
                <>
                  <div className="flex gap-5">
                    <p>{item.name}</p>
                    <p>{item.vendor}</p>
                  </div>
                </>
              ))}
            </div>
          </div>
        </>
      ))}
    </section>
  );
};

export default Orders;
