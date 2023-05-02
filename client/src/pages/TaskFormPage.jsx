import {useEffect} from 'react'; // es un hook nativo de react
import {useForm} from 'react-hook-form'
import {createTask, deleteTask, updateTask, getTask} from '../api/tasks.api'
import {useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-hot-toast'

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
      toast.success('Tarea actualizada', {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff"
        }
      })
    } else {
      // Request Post to backend
      await createTask(data);
      toast.success('Tarea creada', {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff"
        }
      })
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
      <div className='max-w-x1 mx-auto'>
        <form onSubmit={onSubmit}>
          <input 
          type="text" 
          placeholder="Title"
          {...register("title", { required: true })}
          className='bg-zinc-700 p3 rounded-lg block w-full mb-3'
          />
          {errors.title && <span> this field is required</span>}
          <textarea 
          rows="3" 
          placeholder="Description"
          {...register("description", { required: true })}
          className='bg-zinc-700 p3 rounded-lg block w-full mb-3'
          ></textarea>
          {errors.description && <span> this field is required</span>}
          <button className='bg-indigo-500 p3 rounded-lg block w-full mt-3'
          >Save</button>
        </form>

        {params.id && (
          <div className='flex justify-end'>
            <button 
            className='bg-red-500 p3 rounded-lg w-48 mt-3'
            onClick={async () => {
              const accepted = window.confirm("You are sure ?");
              if (accepted){
                await deleteTask(params.id);
                toast.success('Tarea eliminada', {
                  position: "bottom-right",
                  style: {
                    background: "#101010",
                    color: "#fff"
                  }
                })
                navigate("/tasks");
              }
            }}
          >
            Delete
            </button>
          </div>
        )}
      </div>
    )
  }
  