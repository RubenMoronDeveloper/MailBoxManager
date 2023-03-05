<?php

use App\Http\Controllers\Api\CartaController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\VecinoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//Api Vecino

Route::controller(VecinoController::class)->group(function (){
    Route::get('/vecinos','index');
    Route::post('/vecino','store');
    Route::get('/vecino/{id}','show');
    Route::put('/vecino/{id}','update');
    Route::delete('/vecino/{id}','destroy');
    Route::get('/vecino','login');
   /*  Route::get('/vecinoCartas/{id}','innerJoin'); */
});
//Api carta
Route::controller(CartaController::class)->group(function (){
    Route::get('/cartas','index');
    Route::post('/carta','store');//MODIFICADOOO
    Route::get('/carta/{id}','show');
    Route::put('/carta/{id}','update');
    Route::delete('/carta/{id}','destroy');
    Route::get('cartaList/{id}', 'listById');
});


Route::post('register',[UserController::class,'register']);
Route::post('login',[UserController::class,'login']);
Route::get('index',[UserController::class,'index']);
Route::delete('destroy/{id}', [UserController::class, 'destroy']);
Route::put('update/{id}', [UserController::class, 'update']);
Route::get('show/{id}', [UserController::class, 'show']);

Route::group(['middleware'=>["auth:sanctum"]],function(){
    //Rutas user auth

    Route::get('user-profile', [UserController::class, 'userProfile']);
    Route::get('logout', [UserController::class, 'logout']);

    //Rutas cartas
    Route::post('create-carta',[CartaController::class, 'createCarta']);
    Route::get('list-carta',[CartaController::class, 'listCarta']);
    Route::get('show-carta/{id}',[CartaController::class, 'showCarta']); //NO REALIZADO
    Route::delete('delete-carta/{id}',[CartaController::class, 'destroy']);
});
