import React, { useEffect } from 'react';
import { useSortData } from '../SortConfig/sortConfig'
// import Modal from './Modal'
import './countryTable.css'
import Modal from './Modal';

interface props {
    Countries: Array<Object>,

}
const CountryTable = (props: props) => {

    const { items, requestSort } = useSortData(props.Countries)

    const [show, setShow] = React.useState<boolean>(false)
    const [clickedModalItem,setClickedModalItem]=React.useState<number>(0);
    const [modalData,setModalData]=React.useState<any>({});
    const [lang,setLang] = React.useState([]);
    const [currency,setCurrency]=React.useState([]);
    const showModal=(id:any)=>{
        setShow(true)
        setClickedModalItem(id);
       
    }
    const closeModal=()=>{
        setShow(false)
    }

  

    useEffect(()=>{
         const index=clickedModalItem;
         let modalData;
         let languageData;
         let currencyData;
         if(items.length===0){
            modalData=[];
            languageData=[];
            currencyData=[];
         }
         else{
             modalData=items[index];
             languageData=modalData.languages;
             currencyData=modalData.currencies;
            console.log(languageData)

         }
        setLang(languageData);
        setCurrency(currencyData);
        setModalData(modalData)  
    },[clickedModalItem,items])
  
    return (
        <div className="country-table">
            <div className="header">
                List of Countries
            </div>
            <table cellSpacing="0" className="table">

                <thead>
                    <tr className="tr">
                        
                        <th className="th">
                            <div>
                                <button className="btn" onClick={() => requestSort('name')}>
                                    Country (ASC/DSC)
                          </button>
                            </div>
                        </th>
                        <th className="th">
                            <div>
                                <button className="btn" onClick={() => requestSort('population')}>
                                    Population (ASC/DSC)
                          </button>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    { (items.length===0)?(<tr style={{color:"blue"}}>
                        <td>
                            <h4>
                        NO Country Found...
                        </h4>
                        </td>
                        </tr>):
                        items.map((item, id) => (
                            <tr key={id} className="tr">
                               
                               
                                <td className="td tdh"><div>
                                    <img src={`${item.flag}`} height="20px" alt="flag" width="20px" /> <span onClick={()=>showModal(id)}>{item.name}</span>
                                   
                                    </div></td>
                                <td className="td">{item.population}</td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>
             {(items.length===0)?"":
             <Modal handleClose={closeModal} show={show} currency={currency} languages={lang} modalData={modalData}/>
             }
        </div>
    )
}
export default CountryTable;