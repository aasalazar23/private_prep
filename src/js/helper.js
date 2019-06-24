export const locations = [
    { 
      id: 1, 
      name: "NYC", 
      slug: "new-york-city", 
      abbreviation: "nyc" 
      },
    {
      id: 2,
      name: "Westchester",
      slug: "westchester-county",
      abbreviation: "wc",
    },
    { 
      id: 3, 
      name: "Long Island", 
      slug: "long-island", 
      abbreviation: "li" },
    { 
      id: 4, name: "DC Metro", 
      slug: "dc-metro", 
      abbreviation: "dc" },
    {
      id: 5,
      name: "Northern New Jersey",
      slug: "northern-new-jersey",
      abbreviation: "nj",
    },
    { 
      id: 6, 
      name: "Los Angeles", 
      slug: "los-angeles", 
      abbreviation: "la" },
    { 
      id: 7, 
      name: "Online", 
      slug: "online", 
      abbreviation: "ol" 
      },
    { 
      id: 8, 
      name: "Connecticut", 
      slug: "connecticut", 
      abbreviation: "ct" 
      },
    { 
      id: 9, 
      name: "South Florida", 
      slug: "south-florida", 
      abbreviation: "fl" 
      },
    {
      id: 10,
      name: "Central New Jersey",
      slug: "central-new-jersey",
      abbreviation: "njw",
    },
    { 
      id: 11, 
      name: "Tampa Bay", 
      slug: "tampa-bay", 
      abbreviation: "tp" },
  ];
  
  export const findLocationBySlug = slug => locations.find(l => l.slug === slug);
  
  const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
  
    throw new Error(response.statusText);
  };
  
  const parseJSON = payload => {
    if (typeof payload === "string") {
      return JSON.parse(payload);
    }
    return payload.json();
  };
  
  export const fetchLocationTests = location =>
    fetch(
      `https://dashboard.privateprep.com/feeds/practice_tests?locations=${
        location.abbreviation
      }`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then(checkStatus)
      .then(parseJSON);