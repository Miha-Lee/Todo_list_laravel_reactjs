<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{
    public function index()
    {
        $products = Task::select('id', 'title', 'complete')->get();

        return response()->json([
            'products' => $products
        ]);
    }

    public function store(Request $request)
    {
        $formfields = $request->validate([
            'title' => 'required',
            'complete' => 'required'
        ]);

        try {
            Task::create($formfields);

            return response()->json([
                'message' => 'Created task successfully!'
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'error' => 'Something goes wrong while creating a new task'
            ], 500);
        }
    }

    public function update(Request $request, Task $task)
    {
        $formfields = $request->validate([
            'title' => 'required',
            'complete' => 'required'
        ]);

        try {
            $task->update($formfields);

            return response()->json([
                'message' => 'Task updated successfully!'
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'error' => 'Something goes wrong while updating a task'
            ], 500);
        }
    }

    public function destroy(Task $task)
    {
        try {
            $task->delete();

            return response()->json([
                'message' => 'Task deleted successfully!'
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'error' => 'Something goes wrong while deleting a task'
            ]);
        }
    }
}
