const columns = (handleUpdate, handleDelete) => [
    { field : 'id', headerName : 'Product ID', width : 100},
    { field : 'name', headerName : "Name", width : 300},
    { field : "category", headerName : "Category", width : 200},
    { field : "sender_mobile_no", headerName : "Sender Mobile No.", width : 200 },
    { field : "receiver_mobile_no", headerName : "Receiver Mobile No.", width : 200 },
    { field : "delivery_address", headerName : "Delivery Address", width : 200 },
    { field : "expected_delivery_date", headerName : "Expected Date of Delivery", width : 200 },
    { field : "expiry_date", headerName : "Expiry Date", width : 200 },
    {
      field : 'edit',
      headerName : "Edit",
      width : 150,
      renderCell : (params) => (
        <button className = "btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateModal" onClick={() => handleUpdate(params.row.id)}> Edit </button>
      ),
    },
    {
      field : 'delete',
      headerName : "Delete",
      width : 150,
      renderCell : (params) => (
        <button className="btn btn-danger" onClick = {() => handleDelete(params.row.id)} > Delete </button>
      ),
    },
 ]

export default columns;