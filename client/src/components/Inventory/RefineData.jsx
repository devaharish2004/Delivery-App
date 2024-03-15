const RefineData = (data) => {
    return (
      data.map((product) => {
        const { taken_for_delivery, expected_delivery_date, expiry_date, damaged, agent_id, ...otherValues } = product;
        return {
          taken_for_delivery : (taken_for_delivery ? "Yes" : "No"),
          expected_delivery_date : expected_delivery_date.slice(0,10),
          expiry_date : (expiry_date && expiry_date !== '' ? expiry_date.slice(0,10) : "Not Specified"),
          damaged : (damaged ? "Yes" : "No"),
          agent_id : agent_id || "Not Specified",
          ...otherValues,
        }
      })
    )
} 

export default RefineData;