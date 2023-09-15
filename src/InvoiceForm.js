import React, { useContext, useState } from "react";
import { myContext } from "./App";
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

function InvoiceForm() {
    
    const {myCurrency,myTax}= useContext(myContext)
    const[data,setData]=useState({
        cname:"",//cname:Raju
        pname:"",//pname:soap
        pqty:"",
        pprice:""
    })

    function collectData(event){
        //logic to collect all details and store it in above 4 keys
        // console.log(event.target.name)
        // console.log(event.target.value)
        let enteredData = event.target.value

        if(enteredData){
            setData({...data,[event.target.name] :enteredData}) 
        }
    }

    function generatePdf(){
        //logic to first genertae the image then the pdf
        const invoiceData = document.querySelector(".invoicedata")
        html2canvas(invoiceData)
        .then(function(data){
            const imageData=data.toDataURL("img/pdf")
            const documnet = new jsPDF("p","mm","a4")

            const width=documnet.internal.pageSize.getWidth()
            const height=documnet.internal.pageSize.getHeight()

            documnet.addImage(imageData,"PNG",0,0,width,height)
            documnet.save("invoice.pdf")

        })
        .catch( function(error){
            alert(error)

        } )
    }
  return (
    <center>
        <div className="container">
    <div>
      {/* <h1 class="text-3xl font-bold underline">Invoice Form</h1> */}
      <h3>
        <span>Date:{new Date().toLocaleString()}</span> <br/><br/>
        Invoice Number: <input type="number" onChange={collectData}
        className="block w-25 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
      </h3><br/>

      <div>
        <label>Customer Name:</label>
        <input type="text"  name="cname" onChange={collectData}
         className="block w-40 rounded-md border-1 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/><br/>

        <label>Product Name:</label>
        <input type="text"  name="pname" onChange={collectData}
         className="block w-40 rounded-md border-0=1 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/><br/>

        <label>Product Quantity:</label>
        <input type="number"   name="pqty" onChange={collectData}
         className="block w-40 rounded-md border-0=1 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/><br/>

        <label>Product Price:</label>
        <input type="number"  name="pprice" onChange={collectData}
         className="block w-40 rounded-md border-1 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/><br/>
      
      
      <label>Currency:</label>
        <input type="text"  name="pprice" value={myCurrency} onChange={collectData}
         className="block w-40 rounded-md border-1 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/><br/>
      
      
      <label>Tax:</label>
        <input type="number"  name="pprice" value={myTax} onChange={collectData}
         className="block w-40 rounded-md border-1 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/><br/>
      </div>

      <div className="invoicedata">
        <h2>Customer Name:{data.cname}</h2>
        <h2>Product Name: {data.pname}</h2>
        <h2>Product Quantity:{data.pqty}</h2>
        <h2>Product Price:{data.pprice}</h2>
        <h2>Currency:{myCurrency}</h2>
        <h2>Tax:{data.pprice*0.18 }</h2>
      </div>

      <button  onClick={generatePdf}class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Download
</button>
    </div>
    </div>
    </center>
  );
}

export default InvoiceForm;
