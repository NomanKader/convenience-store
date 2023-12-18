import  React,{useEffect, useState} from "react";
import CategoryFormComponent from '../../../components/Category/CategoryFormComponent';
import AppBarDrawerComponent from '../../../components/AppBarDrawer/AppBarDrawerComponent'
import BackDropComponent from "../../../components/Loading/BackDropComponent";

export default function CategoryPage({ history }) {
    const [showBackDrop,setShowBackDrop]=useState(false);
    useEffect(() => {
        if(sessionStorage.getItem('UserRole')==null){
            history.push('/');        
        }
        else{
            setShowBackDrop(true);
            setTimeout(()=>{
                setShowBackDrop(false);
            },1000)
        }        
    },[])
    return(
       <AppBarDrawerComponent title='Category' history={history}>
        <CategoryFormComponent/>
        {showBackDrop && <BackDropComponent/>}
       </AppBarDrawerComponent>
    )
}
