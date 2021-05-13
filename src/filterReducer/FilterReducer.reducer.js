export function reducer(state, action) {
  switch (action.type) {
    case 'sort_by_price_asc': {
      let filteredResults = [...state];
      filteredResults.reduce((newArray, {
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
            providers: [...filteredProviders]
          });
        return newArray;
      }, [])
      return filteredResults;
    }
    case 'sort_by_price_desc': {
      let filteredResults = [...state];
      filteredResults.reduce((newArray, {
        id,
        routeInfo,
        providers
      }) => {
        let filteredProviders = providers.sort((a, b) => {
          if (a.price > b.price) return -1;
          if (b.price > a.price) return 1;
          return 0;
        })
        if (filteredProviders && filteredProviders.length)
          newArray.push({
            id,
            routeInfo,
            providers: [...filteredProviders]
          });
        return newArray;
      }, [])
      return filteredResults;
    }
    case 'sort_by_time_asc': {
      let filteredResults = [...state];
      filteredResults.reduce((newArray, {
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
            providers: [...filteredProviders]
          });
        return newArray;
      }, [])
      return filteredResults;
    }
    case 'sort_by_time_desc': {
      let filteredResults = [...state];
      filteredResults.reduce((newArray, {
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
            providers: [...filteredProviders]
          });
        return newArray;
      }, [])
      return filteredResults;
    }
    case 'filter_by_name': {
      return action.payload.query.reduce((newArray, {
        id,
        routeInfo,
        providers
      }) => {
        let filteredProviders = providers.filter(({
          company
        }) => company.name.toLowerCase().includes(action.payload.value));
        if (filteredProviders && filteredProviders.length)
          newArray.push({
            id,
            routeInfo,
            providers: [...filteredProviders]
          });
        return newArray;
      }, []);
    }
    default:
      throw new Error();
  }
}