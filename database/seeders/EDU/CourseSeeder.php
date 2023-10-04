<?php

namespace Database\Seeders\EDU;

use App\Models\EDU\Course\Course;
use App\Models\EDU\Lecture\Lecture;
use App\Models\EDU\Programme\Programme;
use App\Models\EDU\Section\Section;
use App\Models\EDU\Webinar\Webinar;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       Course::factory()->count(2)->create();

       $courses = Course::all();
       foreach ($courses as $key => $course) {
           Section::factory()->count(2)->create([
               'course_id' => $course->id,
               'lecture_count' => 2,
               'index' => $key,
           ]);
       }

        $sections = Section::all();
        foreach ($sections as $index => $section) {
            Lecture::factory()->count(2)->create([
                'preview_url' => 'https://player.vimeo.com/video/439035104?h=8a93ad7e59',
                'video_url' => 'https://player.vimeo.com/video/465991951?h=f7f7feb73d',
                'section_id' => $section->id,
                'index' => $index
            ]);

            Webinar::factory()->create([
                'section_id' => $section->id,
                'course_id' => $section->course_id,
            ]);
        }

        $programme = Programme::all()->first();

        DB::table('edu_course_programmes')
            ->insert([
                'course_id' => $courses->first()->id,
                'programme_id' => $programme->first()->id,
            ]);

        foreach ($sections as $section) {
            $query = Lecture::where('section_id', $section->id);
            $section->content_length = $query->sum('content_length');
            $section->lecture_count = $query->count();
            $section->save();
        }
    }
}