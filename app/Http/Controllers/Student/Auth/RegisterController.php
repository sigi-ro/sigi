<?php

namespace App\Http\Controllers\Student\Auth;

use App\Actions\EDU\Course\Purchase\RedeemUserCoursePurchasesAction;
use App\Http\Controllers\Controller;
use App\Interfaces\RoleInterface;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::ADMIN_STUDENT;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Show the application registration form.
     *
     * @return Response
     */
    public function showRegistrationForm()
    {
        return Inertia::render('student/auth/Register');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make(
            $data,
            [
                'email'         => [
                    'required',
                    'string',
                    'email',
                    'max:255',
                    'unique:users',
                    'exists:edu_course_purchases,email_address'
                ],
                'first_name'    => ['required', 'string', 'max:255'],
                'last_name'     => ['required', 'string', 'max:255'],
                'password'      => ['required', 'string', 'min:8', 'confirmed'],
            ],
        );
    }

    /**
     * Create a new student instance after a valid registration.
     * Redeem any purchases they may have made
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        $user = User::create([
            'email'         => $data['email'],
            'first_name'    => $data['first_name'],
            'last_name'     => $data['last_name'],
            'password'      => Hash::make($data['password']),
        ]);

        $user->assignRole(Role::whereName(RoleInterface::STUDENT)->first());

        app(RedeemUserCoursePurchasesAction::class)->handle($user);

        return $user;
    }
}
