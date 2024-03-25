export const haveRole = (roleId: string | number | string[] | number[]): boolean => {
    const rolesString = localStorage.getItem("roles");
    if (!rolesString || rolesString === "данных нет"){
        return false;
    }
    if(roleId && Array.isArray(roleId)){
        if (roleId.length<1){
            return false;
        }
        const rolesArr = rolesString.split(",");
        for (const role of roleId){
            if(rolesArr.includes(String(role))){
                return true;

            }
        }
        return false;
    }
    if(roleId){
        return rolesString.split(",").includes(String(roleId));
    }
    else {
        return false;
    }

};