export function fetchChart() {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
      }
    return fetch("/impression_list", {headers, })
        .then((response) => {
              return response.json();
            })
        .then(res => {
              let impressionsFromApi = res.map(Imp => { return Imp.video.name })
              var imp = new Set()
              var index;
              for (index = 0; index < impressionsFromApi.length; ++index) {
                  imp.add(impressionsFromApi[index])
                  }
              var imp_arr = Array.from(imp);
              var index2;
              var impression_list = [];
              for (index2 = 0; index2 < imp_arr.length; ++index2) {
                  var result = impressionsFromApi.filter(index3 => index3 === imp_arr[index2]).length;
                  impression_list.push((imp[index2], result))
                  }
              var imp_dict = {};
              var index3;
              for (index3 = 0; index3 < imp_arr.length; ++index3) {
                  imp_dict[imp_arr[index3]]=impression_list[index3]
                }

              var dataTable = [["Video", "Number of logged impressions"]];
              for(var key in imp_dict) {
                  var value = imp_dict[key];
                  dataTable.push([key,value])
                  };

              return dataTable;
        })
        .then(res => {
          return dispatch({type: 'FETCH_CHARTS', charts: res.dataTable});

      })
      }
    }
