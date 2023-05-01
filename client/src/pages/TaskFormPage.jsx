import {useEffect} from 'react'; // es un hook nativo de react
import {useForm} from 'react-hook-form'
import {createTask, deleteTask, updateTask, getTask} from '../api/tasks.api'
import {useNavigate, useParams} from 'react-router-dom'

export function TasksFormPage() {

    const {
      register, 
      handleSubmit, 
      formState:{errors},
      setValue
    } = useForm();
    const navigate = useNavigate();
    const params = useParams();
    console.log(params)

    const onSubmit = handleSubmit(async data => {
    if (params.id) {
      await updateTask(params.id, data)
    } else {
      // Request Post to backend
      await createTask(data);
    }

    navigate('/tasks')
    })

    useEffect(() => {
      // el hook useEffect solo acepta funciones dentro de su body de codigo y en este caso es una async al backend
      async function loadTask() {
        if (params.id) {
          const {
            data: {title, description},
          } = await getTask(params.id);

          setValue('title', title);
          setValue('description', description);
        }
      
      }
      loadTask()
    }, [])
    

    return (
      <div>
        <form onSubmit={onSubmit}>
          <input 
          type="text" 
          placeholder="Title"
          {...register("title", { required: true })}
          />
          {errors.title && <span> this field is required</span>}
          <textarea 
          rows="3" 
          placeholder="Description"
          {...register("description", { required: true })}
          ></textarea>
          {errors.description && <span> this field is required</span>}
          <button>Save</button>
        </form>

        {params.id && (
          <button 
            onClick={async () => {
              const accepted = window.confirm("You are sure ?");
              if (accepted){
                await deleteTask(params.id);
                // navigate("/tasks");
              }
            }}
        >
          Delete
          </button>
        )}
      </div>
    )
  }
  