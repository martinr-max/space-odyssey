export function filterByName(query, value) {
  let filterValue = query.reduce((newArray, {
    id,
    routeInfo,
    providers
  }) => {
    let filteredProviders = providers.filter(({
      company
    }) => company.name.toLowerCase().includes(value));
    if (filteredProviders && filteredProviders.length)
      newArray.push({
        id,
        routeInfo,
        providers: filteredProviders
      });
    return newArray;
  }, []);
  return [...filterValue];
}

export function sortByTimeDesc(query) {
  let filteredResults = query.reduce((newArray, {
    id,
    routeInfo,
    providers
  }) => {
    let filteredProviders = providers.sort((a, b) => {
      if (a.flightStart > b.flightStart) return -1;
      if (b.flightStart > a.flightStart) return 1;
      return 0;
    })
    if (filteredProviders && filteredProviders.length)
      newArray.push({
        id,
        routeInfo,
        providers: filteredProviders
      });
    return newArray;
  }, [])
  return [...filteredResults];
}

export function sortByTimeAsc(query) {
  let filteredResults = query.reduce((newArray, {
    id,
    routeInfo,
    providers
  }) => {
    let filteredProviders = providers.sort((a, b) => {
      if (a.flightStart > b.flightStart) return 1;
      if (b.flightStart > a.flightStart) return -1;
      return 0;
    })
    if (filteredProviders && filteredProviders.length)
      newArray.push({
        id,
        routeInfo,
        providers: filteredProviders
      });
    return newArray;
  }, [])
  return [...filteredResults];
}

export function sortByPriceAsc(query) {
  let filteredResults = query.reduce((newArray, {
    id,
    routeInfo,
    providers
  }) => {
    let filteredProviders = providers.sort((a, b) => {
      if (a.price > b.price) return 1;
      if (b.price > a.price) return -1;
      return 0;
    })
    if (filteredProviders && filteredProviders.length)
      newArray.push({
        id,
        routeInfo,
        providers: filteredProviders
      });
    return newArray;
  }, [])
  return [...filteredResults];
}

export function sortByPriceDesc(query) {
  const filteredResults = query.reduce((newArray, {
    id,
    routeInfo,
    providers
  }) => {
    let filteredProviders = providers.sort((a, b) => {
      if (a.price > b.price) return 1;
      if (b.price > a.price) return -1;
      return 0;
    })
    if (filteredProviders && filteredProviders.length)
      newArray.push({
        id,
        routeInfo,
        providers: filteredProviders
      });
    return newArray;
  }, [])
  return [...filteredResults]
}