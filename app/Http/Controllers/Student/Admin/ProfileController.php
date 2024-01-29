<?php

namespace App\Http\Controllers\Student\Admin;

use App\Actions\EDU\Course\Student\RequestRefundAction;
use App\Http\Controllers\AdminController;
use App\Http\Requests\Admin\Profile\CoursePurchaseRefundRequest;
use App\Http\Requests\Admin\Profile\ProfileUpdateRequest;
use App\Interfaces\PermissionInterface;
use App\Models\EDU\Course\CoursePurchase;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProfileController extends AdminController
{
    public function __construct()
    {
        parent::__construct();
        $this->addMetaTitleSection('Profile');

        $this->middleware(
            PermissionInterface::getMiddlewareString(PermissionInterface::EDIT_PROFILE)
        )->only(['edit', 'update']);

        $this->middleware(
            PermissionInterface::getMiddlewareString(PermissionInterface::VIEW_PROFILE)
        )->only('index');
    }

    /**
     * TODO:: Remove if unused?
     */
    public function edit()
    {
        $this->addMetaTitleSection('Edit');
        $this->shareMeta();

        $user = Auth::user();
        $canRequestRefund = true;

        return Inertia::render('student/admin/profile/Edit', [
            'profile' => $user,
            'can_request_refund' => $canRequestRefund,
        ]);
    }

    public function index()
    {
        $this->shareMeta();

        $user = Auth::user();
        $coursePurchases = $user->coursePurchases()->with(['course', 'instalmentPlan'])->get();

        return Inertia::render('student/admin/profile/Index', [
            'profile' => $user,
            'purchases' => $coursePurchases,
        ]);
    }

    public function update(ProfileUpdateRequest $request)
    {
        Auth::user()->update($request->validated());
        return Redirect::to(route('student.admin.profile.index'))->with('success', 'Profile updated.');
    }

    public function refund(CoursePurchaseRefundRequest $request, CoursePurchase $coursePurchase): RedirectResponse
    {
        app(RequestRefundAction::class)->handle($request->validated(), $coursePurchase);

        return Redirect::back(303)->with(
            'success',
            'Refund requested.'
        );
    }
}
