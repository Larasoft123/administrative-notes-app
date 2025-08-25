
import { CreateStudentForm } from "@/components/students/forms/create-student-form"
import {getYears} from "@/lib/api/years"
import {getSections} from "@/lib/api/sections"


export default async function CreateStudentsPage() {
    const anos = await getYears();
    const sections = await getSections({id:10})
  
    
    
    return (
        <div className=""> 
            <CreateStudentForm anos={anos} secciones={sections}/>
        </div>
    )
}
