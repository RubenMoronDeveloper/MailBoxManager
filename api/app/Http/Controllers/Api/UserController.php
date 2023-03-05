<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $usuarios = User::all();
        return $usuarios;
    }
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
            'piso' => 'required',
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->piso = $request->piso;

        $user->save();

        return response()->json([
            "status" => 1,
            "msg" => "Registro exitoso",
        ]);
    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        $user = User::where("email", "=", $request->email)->first();
        if (isset($user->id)) {
            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken("auth_token")->plainTextToken;
                return response()->json([
                    "status" => 0,
                    "msg" => "Usuario logeado exitosamente",
                    "access_token" => $token
                ]);
            } else {
                return response()->json([
                    "status" => 0,
                    "msg" => "La password es incorrecta",
                ], 404);
            }
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "Usuario no registrado",
            ], 404);
        }
    }
    public function userProfile()
    {
        return response()->json([
            "status" => 0,
            "msg" => "Acerca del perfil de usuario",
            "data" => auth()->user()
        ]);
    }
    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            "status" => 1,
            "msg" => "Cierre de sesion",

        ], 404);
    }
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($request->id);

        $user->name = $request->name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        // $user->password = Hash::make($request->password);
        $user->piso = $request->piso;

        $user->save();
    }
    public function destroy(string $id)
    {
        auth()->user();
        $user = User::destroy($id);
        return $user;
    }
    public function show(string $id)
    {
        $vecino = User::find($id);
        return $vecino;
    }

}
