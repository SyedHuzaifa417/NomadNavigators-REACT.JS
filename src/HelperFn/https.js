const API_URL = "https://localhost:7266/api/";

export async function fetchAvailableReviews() {
  const response = await fetch(`${API_URL}Reviews`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return resData;
}

////////////////////////////////////////////////

export async function postReview(newReview) {
  try {
    const response = await fetch(`${API_URL}Reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    });

    if (!response.ok) {
      throw new Error("Failed to post review");
    }

    const resData = await response.json();
    return resData; // Return the response data if needed
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to propagate it up if needed
  }
}

////////////////////////////////////////////////////////

export async function register({ userName, email, password, dob }) {
  try {
    const response = await fetch(`${API_URL}Users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, email, password, dob }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Registration failed");
    }

    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

////////////////////////////////////////////////////

export async function login({ email, password }) {
  try {
    const response = await fetch(`${API_URL}Users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Invalid login credentials");
    }
    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

////////////////////////////////////////////////////

export async function logOut() {
  try {
    const response = await fetch(`${API_URL}users/logout`, {
      method: "POST",
    });

    if (response.ok) {
      console.log("Logout successful");
    } else {
      console.error("Logout failed");
    }
  } catch (err) {
    console.error("Logout error:", err);
  }
}

////////////////////////////////////////////////////

export async function partnerRequest({
  name,
  email,
  contact,
  areaOfInterest,
  country,
}) {
  try {
    const response = await fetch(`${API_URL}Partners`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, contact, areaOfInterest, country }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "request for partnership failed");
    }

    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

////////////////////////////////////////////////////

export async function fetchAvailablePlaces() {
  const response = await fetch(`${API_URL}Places`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return resData;
}

////////////////////////////////////////////////////

export async function fetchAvailableRestaurants() {
  const response = await fetch(`${API_URL}Restaurants`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return resData;
}

////////////////////////////////////////////////////

export async function fetchAvailableFlights() {
  const response = await fetch(`${API_URL}Flights`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return resData;
}
