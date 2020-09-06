export const errorHandler = (err) => {
    if(err&& err.message){
        alert(err.message)
    }else{
        alert("Something went wrong")
    }
}