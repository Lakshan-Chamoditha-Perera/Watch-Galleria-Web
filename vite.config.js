import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({mode})=>{
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    define:{
      'process.env': Object.keys(env).reduce((acc, key)=>{
        acc[key] = (env[key]);
        return acc;
      }, {})
    }
  }
})