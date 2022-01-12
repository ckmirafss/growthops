<?php

namespace App\Http\Controllers;

use App\Models\Plants;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;


class PlantsController extends Controller
{

    public function index()
    {
        $data = Plants::orderBy('created_at', 'desc')->get();
        return  $data;
    }

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required',
            'species' => 'required',
            'instructions' => 'required',
            'photo' => 'mimes:jpeg,png,jpg,gif,svg',
        ];
        $validator = Validator::make($request->all(), $rules);
        if (!$validator->passes()) {
            $data['success'] = false;
            $data['errors'] = $validator->errors();
            return response()->json($data);
        }
        $details = ['name' => $request->name, 'species' => $request->species, 'instructions' => $request->instructions];
        if ($files = $request->file('photo')) {

            $destinationPath = 'assets/main/images/'; // upload path
            $imageBanner = date('YmdHis') . "." . $files->getClientOriginalExtension();
            $files->move($destinationPath, $imageBanner);
            $details['photo'] = $destinationPath . $imageBanner;
        }

        $slider = Plants::create($details);
        return $slider;
    }
}
