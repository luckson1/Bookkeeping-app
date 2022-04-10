import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../components/Loading";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage"
import { accountsStatsAction } from "../../redux/slices/accountStats/accountStatsSlices";
import GraphDtata from "../../components/GraphData";
import currencyFormatter from "../../utils/currencyFormatter"
const DashboardData = () => {

    const dispatch= useDispatch()

    useEffect(() => {
        dispatch(accountsStatsAction())
    }, [dispatch])

    const stats= useSelector((state) => { return state?.accountsStats})
    const {statsLoading, statsAppErr, statsList, statsServerErr}= stats
    
    const salesData=statsList?.salesStats?.[0]
    const expensesData= statsList?.expenseStats?.[0]
   
  //format date
  return (
      <>
      {statsLoading? <LoadingComponent />: statsServerErr || statsAppErr ?
       <ErrorDisplayMessage>
       {statsAppErr}  {statsServerErr}
       </ErrorDisplayMessage> :<section class="py-6">
       <div class="container">
         Graph
         <div
           style={{
             display: "flex",
             justifyContent: "center",
             alignItems: "center",
             marginBottom: "20px",
           }}
         >
           
           <GraphDtata sales={salesData?.totalSales} expenses={expensesData?.totalExpenses} />
         </div>
         {/* Net Profit */}
         <div style={{ textAlign: "center", margin: "20px" }}>
           {/* <h2 className="text-success">Net Profit : {formattedNetProfit}</h2> */}
         </div>
         <div class="row">
           <div class="col-12 col-md-6 mb-6">
             <div class="p-8 border rounded-2">
               <div class="d-flex mb-6 align-items-start justify-content-between">
                 <span
                   class="d-inline-flex align-items-center justify-content-center bg-light-light rounded-2"
                   style={{ width: "40px", height: "40px" }}
                 ></span>
                 {/* Expenses Start */}
                 <span class="badge fs-2 bg-light text-danger">
                   Total Expenses
                 </span>
               </div>
               <h1 class="mb-4">{currencyFormatter(expensesData?.totalExpenses)}</h1>
               <p class="mb-0">
                 <span>Number of Transactions</span>
                 <span class="text-danger ms-1">
                   <span>{expensesData?.totalRecordsExpenses}</span>
                 </span>
               </p>
 
               <p class="mb-0">
                 <span>Minimum Transactions</span>
                 <span class="text-danger ms-1">
                   <span>{currencyFormatter(expensesData?.minExpense)}</span>
                 </span>
               </p>
 
               <p class="mb-0">
                 <span>Maximum Transactions</span>
                 <span class="text-danger ms-1">
                   <span>{currencyFormatter(expensesData?.maxExpense)}</span>
                 </span>
               </p>
 
               <p class="mb-0">
                 <span>Average Transactions</span>
                 <span class="text-danger ms-1">
                   <span>{currencyFormatter(expensesData?.averageExpense)}</span>
                 </span>
               </p>
             </div>
           </div>
           <div class="col-12 col-md-6 mb-6">
             <div class="p-8 border rounded-2">
               <div class="d-flex mb-6 align-items-start justify-content-between">
                 <span
                   class="d-inline-flex align-items-center justify-content-center bg-danger-light rounded-2"
                   style={{ width: "40px", height: "40px" }}
                 ></span>
 
                 {/* Income Start */}
                 <span class="badge fs-2 bg-primary-light text-primary">
                   Total Sales
                 </span>
               </div>
               <h1 class="mb-4">{currencyFormatter(salesData?.totalSales)}</h1>
 
               <p class="mb-0">
                 <span>Number of Transactions</span>
                 <span class="text-danger ms-1">
                   <span>{salesData?.totalRecordsSales}</span>
                 </span>
               </p>
 
               <p class="mb-0">
                 <span>Minimum Transactions</span>
                 <span class="text-danger ms-1">
                   <span>{currencyFormatter(salesData?.minSale)}</span>
                 </span>
               </p>
 
               <p class="mb-0">
                 <span>Maximum Transactions</span>
                 <span class="text-danger ms-1">
                   <span>{currencyFormatter(salesData?.maxSale)}</span>
                 </span>
               </p>
 
               <p class="mb-0">
                 <span>Average Transactions</span>
                 <span class="text-danger ms-1">
                   <span>{currencyFormatter(salesData?.averageSale)}</span>
                 </span>
               </p>
             </div>
           </div>
         </div>
       </div>
     </section> }
     </>
  );
};

export default DashboardData;