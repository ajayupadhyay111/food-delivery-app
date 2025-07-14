import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from 'axios'
import { toast } from "sonner";
import useRestaurantStore from "./useRestaurantStore";

type MenuState = {
  loading: boolean;
  menu: null;
  createMenu: (formData: FormData) => Promise<void>;
  editMenuCard: (menuId: string, formData: FormData) => Promise<void>;
};

const API_END_POINT = "http://localhost:8000/api/v1/menu";
axios.defaults.withCredentials = true;


const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      loading: false,
      menu: null,
      createMenu: async (formData:FormData) => {
        try {
            set({loading:true})
            const response = await axios.post(`${API_END_POINT}`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            if(response.data.success){
                toast.success(response.data.message)
                set({menu:response.data.menu})
            }
            useRestaurantStore.getState().addMenuToRestaurant(response.data.menu)
        } catch (error) {
            console.log(error)
        }finally{
            set({loading:false})
        }
      },
      editMenuCard: async (menuId:string,formData:FormData) => {
        try {
            set({loading:true})
            const response = await axios.put(`${API_END_POINT}/${menuId}`,formData,{
                headers:{
                    'Content-Type':"multipart/form-data"
                }
            })
            if(response.data.success){
                toast.success(response.data.message)
                set({menu:response.data.menu})
            }
         useRestaurantStore.getState().updateMenuOfRestaurant(response.data.menu)
        } catch (error) {
            console.log(error)
        }finally{
            set({loading:false})
        }
      },
    }),
    {
      name: "menu-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useMenuStore;