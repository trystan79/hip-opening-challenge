-- =============================================
-- 10-Day Hamstrings & Calves Routine - Seed Data
-- =============================================

-- ROUTINE
INSERT INTO routine (id, name, slug, description, total_days, icon, color) VALUES
(2, 'Hamstrings & Calves', 'hamstrings-calves', 'A progressive 10-day program targeting the posterior leg chain — hamstrings (biceps femoris, semitendinosus, semimembranosus), gastrocnemius, soleus, and associated connective tissue. Builds from standing basics to full integration poses.', 10, 'leg', '#4ecdc4');

-- =============================================
-- DAYS (10 days, 2 weeks)
-- Week 1: Foundational (Days 1-5)
-- Week 2: Intermediate/Integration (Days 6-10)
-- =============================================

-- Week 1: Foundational
INSERT INTO day (id, routine_id, week, theme, description, sort_order) VALUES
(22, 2, 1, 'Standing Basics', 'Introduce the two most accessible posterior chain stretches: a gravity-assisted standing forward fold for the hamstrings and a wall-supported calf stretch for the gastrocnemius. Both standing, both prop-supported.', 1);
INSERT INTO day (id, routine_id, week, theme, description, sort_order) VALUES
(23, 2, 1, 'Supine + Calf Intro', 'Move to the floor for a strap-assisted supine hamstring stretch that removes gravity and balance demands. Pair with Downward Dog calf pedaling for dynamic, rhythmic calf engagement.', 2);
INSERT INTO day (id, routine_id, week, theme, description, sort_order) VALUES
(24, 2, 1, 'Seated Ham + Deep Calf', 'Introduce the seated forward fold pattern (Head-to-Knee) targeting one leg at a time for asymmetric hamstring lengthening. Pair with a step-based calf stretch that uses body weight and gravity for deeper gastrocnemius and soleus access.', 3);
INSERT INTO day (id, routine_id, week, theme, description, sort_order) VALUES
(25, 2, 1, 'Standing Deep Ham + Soleus', 'Pyramid pose adds a balance and alignment challenge to hamstring lengthening. The Soleus Wall Stretch isolates the soleus by bending the knee, distinguishing it from the straight-leg gastrocnemius stretch.', 4);
INSERT INTO day (id, routine_id, week, theme, description, sort_order) VALUES
(26, 2, 1, 'Medial Hams + Gastrocnemius', 'Wide-Leg Forward Fold shifts the hamstring stretch emphasis to the medial hamstrings (semimembranosus, semitendinosus) and adductors. Toe-Up Wall Stretch biases the gastrocnemius with a straight knee and dorsiflexed ankle.', 5);

-- Week 2: Intermediate/Integration
INSERT INTO day (id, routine_id, week, theme, description, sort_order) VALUES
(27, 2, 2, 'Dynamic Ham + Calf', 'Runner''s Lunge Hamstring uses a split-stance active position for hamstring lengthening under mild load. Chair Calf Raise Stretch introduces eccentric loading — the calf lengthens from a shortened position.', 6);
INSERT INTO day (id, routine_id, week, theme, description, sort_order) VALUES
(28, 2, 2, 'Medial Chain + Ankle', 'Supine Wide-Leg Strap opens the medial hamstrings and adductors from a passive supine position. Prone Ankle Dorsiflexion targets the deep ankle joint and posterior compartment from a novel prone angle.', 7);
INSERT INTO day (id, routine_id, week, theme, description, sort_order) VALUES
(29, 2, 2, 'Rotational Ham + Lateral Calf', 'Revolved Head-to-Knee adds thoracic rotation and lateral flexion to the hamstring stretch pattern. Standing Cross-Leg Calf targets the peroneal muscles and lateral calf compartment.', 8);
INSERT INTO day (id, routine_id, week, theme, description, sort_order) VALUES
(30, 2, 2, 'Prop-Assisted + Deep Calf', 'Chair Hamstring Fold uses a chair for elevated hamstring lengthening with spinal decompression. Deep Squat Heel Press loads the Achilles tendon and deep soleus at end-range dorsiflexion.', 9);
INSERT INTO day (id, routine_id, week, theme, description, sort_order) VALUES
(31, 2, 2, 'Integration', 'Full Splits Prep tests cumulative hamstring and hip flexor range in a near-maximal sagittal split. Skandasana integrates hamstring, adductor, and calf flexibility in a deep lateral lunge. The culmination of 10 days of posterior chain work.', 10);

-- =============================================
-- POSES (20 total, 2 per day)
-- Each with full muscle indexing and coaching data
-- =============================================

-- DAY 1: Standing Basics
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(22, 1, 'Standing Forward Fold', 'Stand with feet hip-width apart. Inhale to lengthen the spine, then exhale and hinge forward from the hips, keeping the spine long. Let your hands reach toward the floor, shins, or blocks. Allow the head to hang heavy. Maintain a micro-bend in the knees if the hamstrings are very tight.',
'["Hinge from the hips, not the lower back — think of tilting the pelvis forward","Let the head hang heavy to release the cervical spine","Shift weight slightly toward the balls of the feet to stack hips over ankles","Engage the quadriceps gently to reciprocally inhibit the hamstrings"]',
120, 0, '["blocks (optional)"]',
'Hamstrings, Gluteals',
'Biceps femoris (long head), Semitendinosus, Semimembranosus, Gluteus maximus',
'Erector spinae, Gastrocnemius (mildly), Piriformis, Thoracolumbar fascia',
'Hip flexion, Knee extension',
'sagittal',
'Bend knees generously. Hands on blocks or shins. Keep spine long rather than rounding.',
'Feet hip-width, legs straight with micro-bend. Hands reach toward floor. Head hangs.',
'Feet together. Grab behind the ankles and pull torso toward thighs. Straighten legs completely.',
'{"inhale":4,"hold":0,"exhale":6}',
1);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(22, 2, 'Wall Calf Stretch', 'Stand facing a wall at arm''s length. Place both hands on the wall at shoulder height. Step one foot back approximately two to three feet, keeping the back leg straight and the heel pressed into the floor. Lean into the wall by bending the front knee until a stretch is felt in the back calf.',
'["Keep the back heel firmly on the floor — this is the anchor","Point both sets of toes straight ahead, not turned out","Lean hips forward toward the wall to deepen the stretch","Keep the back knee fully straight to target the gastrocnemius"]',
120, 1, '["wall"]',
'Gastrocnemius',
'Gastrocnemius (medial and lateral heads), Plantaris',
'Soleus (mildly — knee is straight), Achilles tendon, Plantar fascia, Peroneus longus',
'Ankle dorsiflexion',
'sagittal',
'Shorter stance. Slight bend in back knee. Hands higher on wall.',
'Staggered stance, back leg straight, heel down, leaning into wall. Front knee bent.',
'Move back foot farther from wall. Place forearms on wall instead of hands for deeper lean.',
'{"inhale":4,"hold":0,"exhale":6}',
2);

-- DAY 2: Supine + Calf Intro
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(23, 1, 'Supine Strap Hamstring', 'Lie on your back with both legs extended. Loop a strap around the ball of one foot. Raise that leg toward the ceiling, keeping it as straight as possible. Use the strap to gently pull the leg closer to your torso. Keep the opposite leg flat on the floor with the foot flexed.',
'["Keep the bottom leg active and pressed into the floor — this stabilizes the pelvis","Don''t force the raised leg — let the strap provide gentle sustained tension","Flex the foot of the raised leg to add a neural glide component","Keep your head and shoulders relaxed on the floor"]',
120, 1, '["strap"]',
'Hamstrings (raised leg)',
'Biceps femoris (long head), Semitendinosus, Semimembranosus',
'Gastrocnemius (raised leg, with foot flexed), Gluteus maximus (raised leg), Psoas major and Iliacus (floor leg, held in extension)',
'Hip flexion, Knee extension',
'sagittal',
'Bend the raised knee slightly. Keep bottom leg bent with foot flat on floor.',
'Raised leg extended toward ceiling with strap. Floor leg straight and active.',
'Pull raised leg closer. Straighten completely. Remove strap and use hands behind the thigh.',
'{"inhale":4,"hold":0,"exhale":6}',
3);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(23, 2, 'Downward Dog Calf Pedal', 'From hands and knees, tuck your toes and lift your hips up and back into an inverted V shape (Downward Dog). Begin alternately bending one knee while pressing the opposite heel toward the floor. Slowly pedal back and forth, holding each side for several breaths before switching.',
'["Press the heel actively toward the floor — you don''t need to touch","Keep your hands shoulder-width apart, fingers spread","Lift the hips high and back to lengthen the posterior chain","When holding one side, keep the straight leg fully engaged"]',
120, 0, '["mat"]',
'Gastrocnemius, Soleus',
'Gastrocnemius (medial and lateral heads), Soleus (when knee bends on opposite pedal)',
'Hamstrings (both legs), Latissimus dorsi, Thoracolumbar fascia, Plantar fascia, Achilles tendon',
'Ankle dorsiflexion, Hip flexion, Shoulder flexion',
'multi-planar',
'Keep both knees bent. Walk feet closer to hands. Focus on pressing one heel at a time.',
'Downward Dog with alternating heel presses. Hold each side 5-10 breaths.',
'Hold both heels down simultaneously. Walk feet farther from hands for deeper stretch.',
'{"inhale":4,"hold":0,"exhale":6}',
4);

-- DAY 3: Seated Ham + Deep Calf
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(24, 1, 'Head-to-Knee Fold', 'Sit on the floor with both legs extended. Bend your left knee and place the sole of your left foot against your right inner thigh. Inhale to lengthen the spine, then exhale and fold forward over the extended right leg, reaching for the shin, ankle, or foot. Keep the extended leg straight and the foot flexed.',
'["Sit on a block or folded blanket to tilt the pelvis forward","Reach the chest toward the knee rather than rounding the upper back","Keep the extended leg straight with the kneecap pointing up","Flex the foot of the straight leg to engage the anterior tibialis and deepen the calf stretch"]',
120, 1, '["block or blanket"]',
'Hamstrings (extended leg)',
'Biceps femoris (long head), Semitendinosus, Semimembranosus',
'Erector spinae, Gluteus maximus (extended leg), Gastrocnemius (with foot flexed), Adductors (bent leg, mildly)',
'Hip flexion, Knee extension, Spinal flexion',
'sagittal',
'Sit on a tall block. Loop a strap around the foot of the extended leg. Keep spine long — minimal fold.',
'Seated with one leg bent in, folding over extended leg. Hands on shin or foot.',
'Grab the sole of the foot with both hands. Pull torso flat against the thigh. Forehead to shin.',
'{"inhale":4,"hold":0,"exhale":6}',
5);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(24, 2, 'Step Drop Calf Stretch', 'Stand on a step or stair with the balls of both feet on the edge, heels hanging off. Hold a railing or wall for balance. Slowly lower one heel below the level of the step until a deep stretch is felt in the calf. Keep the knee straight. Hold, then switch sides.',
'["Lower the heel slowly and with control — avoid bouncing","Keep the stretching leg''s knee fully straight to bias the gastrocnemius","Hold the railing firmly for balance and safety","Let gravity and body weight create the stretch — don''t force"]',
120, 1, '["step or stair","railing or wall"]',
'Gastrocnemius, Achilles tendon',
'Gastrocnemius (medial and lateral heads), Achilles tendon (calcaneal tendon)',
'Soleus (partially, depending on knee position), Plantaris, Plantar fascia, Peroneus longus, Tibialis posterior',
'Ankle dorsiflexion',
'sagittal',
'Lower heel only slightly. Keep both feet on the step with one heel barely off the edge.',
'Ball of foot on step edge, heel dropped below step level. Knee straight. Railing for balance.',
'Add body weight by lifting the non-stretching foot off the step (single-leg drop). Hold longer.',
'{"inhale":4,"hold":0,"exhale":6}',
6);

-- DAY 4: Standing Deep Ham + Soleus
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(25, 1, 'Pyramid Pose', 'Stand with feet staggered about three feet apart, both feet facing forward. The back foot can angle out slightly. Square your hips to face the front leg. Inhale to lengthen the spine, then exhale and fold forward over the front leg, hinging at the hips. Place hands on blocks flanking the front foot or on the shin.',
'["Square both hips toward the front leg — draw the front hip back and the back hip forward","Keep the front leg straight with a micro-bend if needed","Lengthen the spine on the inhale, deepen the fold on the exhale","Press firmly through the back heel to maintain balance"]',
120, 1, '["blocks"]',
'Hamstrings (front leg), Gluteals',
'Biceps femoris (long head), Semitendinosus, Semimembranosus, Gluteus maximus (front leg)',
'Erector spinae, Gastrocnemius (back leg), Piriformis (front leg), Hip flexors (back leg — Psoas, Iliacus)',
'Hip flexion, Knee extension',
'sagittal',
'Shorten the stance. Hands on tall blocks. Bend the front knee slightly.',
'Staggered stance, hips squared, folding over straight front leg. Hands on blocks or shin.',
'Hands to floor. Forehead toward shin. Clasp hands behind back (reverse prayer) for shoulder opening.',
'{"inhale":4,"hold":0,"exhale":6}',
7);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(25, 2, 'Soleus Wall Stretch', 'Stand facing a wall at arm''s length. Step one foot back about one and a half feet. Bend BOTH knees while keeping the back heel pressed into the floor. The bent back knee shifts the stretch from the gastrocnemius to the deeper soleus muscle. Lean gently into the wall.',
'["Both knees must be bent — this is what differentiates it from a standard calf stretch","Keep the back heel firmly grounded","You will feel this deeper in the calf, closer to the Achilles tendon","The stretch is subtler than a straight-leg calf stretch — be patient"]',
120, 1, '["wall"]',
'Soleus',
'Soleus, Achilles tendon (calcaneal tendon)',
'Tibialis posterior, Flexor hallucis longus, Flexor digitorum longus, Plantaris, Peroneus longus and brevis',
'Ankle dorsiflexion (with knee flexion)',
'sagittal',
'Shorter stance. Minimal knee bend. Hands higher on wall for less lean.',
'Staggered stance, both knees bent, back heel grounded, leaning gently into wall.',
'Longer stance. Deeper knee bend on back leg. More body weight leaning into wall.',
'{"inhale":4,"hold":0,"exhale":6}',
8);

-- DAY 5: Medial Hams + Gastrocnemius
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(26, 1, 'Wide-Leg Forward Fold', 'Stand with feet wide apart (approximately four feet), toes pointing forward or slightly inward. Place hands on hips. Inhale to lengthen the spine, then exhale and hinge forward from the hips. Place hands on the floor or on blocks between your feet. Let the crown of the head descend toward the floor.',
'["Turn the toes slightly inward to protect the knees and bias the medial hamstrings","Hinge from the hips — keep the spine long as you fold","Engage the quadriceps to help release the hamstrings via reciprocal inhibition","Shift weight slightly forward toward the balls of the feet"]',
120, 0, '["blocks (optional)"]',
'Hamstrings (medial emphasis), Hip adductors',
'Semimembranosus, Semitendinosus, Gracilis, Adductor magnus',
'Biceps femoris (long head), Gluteus maximus, Erector spinae, Gastrocnemius (mildly)',
'Hip flexion, Hip abduction, Knee extension',
'frontal',
'Narrower stance. Hands on tall blocks. Bend knees slightly.',
'Wide stance, feet parallel, folding forward. Hands on floor or blocks. Crown of head descending.',
'Hands between feet, crown of head on floor. Walk hands back in line with feet. Grab ankles.',
'{"inhale":4,"hold":0,"exhale":6}',
9);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(26, 2, 'Toe-Up Wall Stretch', 'Stand facing a wall. Place the ball of one foot against the wall with the heel on the floor, creating dorsiflexion in the ankle. Keep the leg straight. Lean your body gently toward the wall to increase the stretch in the calf. Hands rest on the wall for balance.',
'["Keep the stretching leg''s knee fully locked straight — this targets the gastrocnemius","Press the ball of the foot into the wall while the heel stays grounded","Lean from the hips, not just the shoulders","You should feel this high in the calf, behind the knee"]',
120, 1, '["wall"]',
'Gastrocnemius',
'Gastrocnemius (medial and lateral heads), Plantaris',
'Soleus (mildly), Achilles tendon, Plantar fascia, Peroneus longus, Tibialis posterior',
'Ankle dorsiflexion',
'sagittal',
'Place foot lower on the wall (less dorsiflexion). Minimal forward lean.',
'Ball of foot on wall, heel on floor, knee straight. Leaning into wall with hands for balance.',
'Place foot higher on wall. Lean deeper. Add slight knee bend at end of hold to also target soleus.',
'{"inhale":4,"hold":0,"exhale":6}',
10);

-- DAY 6: Dynamic Ham + Calf
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(27, 1, 'Runner''s Lunge Hamstring', 'From a low lunge position with the right foot forward, straighten the front leg and shift your hips back over the back knee. Flex the front foot so the toes point toward the ceiling. Place blocks under your hands on either side of the front leg. Keep the spine long as you fold over the straight front leg.',
'["Shift the hips back until they stack over the back knee","Keep the front leg straight with the foot flexed","Lengthen the spine — lead with the chest, not the forehead","Use blocks under hands so you can maintain a long spine"]',
120, 1, '["blocks","knee cushion"]',
'Hamstrings (front leg)',
'Biceps femoris (long head), Semitendinosus, Semimembranosus',
'Gastrocnemius (front leg, with foot flexed), Gluteus maximus (front leg), Erector spinae, Hip flexors (back leg — Psoas, Iliacus in kneeling)',
'Hip flexion, Knee extension',
'sagittal',
'Bend the front knee slightly. Hands on tall blocks. Hips stay forward of back knee.',
'Low lunge shifted back, front leg straight, foot flexed. Hands on blocks. Spine long.',
'Walk hands forward onto the floor. Lower forehead toward the shin. Remove blocks.',
'{"inhale":4,"hold":0,"exhale":6}',
11);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(27, 2, 'Chair Calf Raise Stretch', 'Stand behind a chair, holding the back for balance. Rise up onto the balls of both feet (calf raise). Then slowly lower your heels past the starting point, allowing them to descend as far as range allows while keeping the knees straight. Hold at the bottom position where the calves are maximally lengthened under load.',
'["Rise up first, then lower slowly past neutral — this is eccentric loading","Keep knees straight throughout for gastrocnemius emphasis","Control the descent — don''t drop the heels","Hold the bottom stretched position and breathe"]',
120, 0, '["chair"]',
'Gastrocnemius, Soleus',
'Gastrocnemius (medial and lateral heads), Soleus',
'Achilles tendon, Plantaris, Tibialis posterior, Peroneus longus, Plantar fascia',
'Ankle dorsiflexion (eccentric), Ankle plantarflexion (concentric)',
'sagittal',
'Skip the rise. Simply stand on flat ground and shift weight to heels with toes slightly elevated.',
'Double-leg calf raise, then controlled eccentric lower past neutral. Hold at bottom.',
'Single-leg eccentric calf lower. Rise on two feet, lower on one.',
'{"inhale":4,"hold":0,"exhale":6}',
12);

-- DAY 7: Medial Chain + Ankle
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(28, 1, 'Supine Wide-Leg Strap', 'Lie on your back. Raise one leg toward the ceiling with a strap looped around the foot. Keeping the leg straight, slowly open it out to the side toward the floor, using the strap to guide the descent. Keep the opposite hip grounded. This targets the medial hamstrings and adductors.',
'["Keep the opposite hip and leg firmly on the floor — anchor with the free hand on the hip","Let the leg fall only as far as the hip stays grounded","Use the strap to control depth — no forcing","You should feel this along the inner thigh and behind the inner knee"]',
120, 1, '["strap"]',
'Medial hamstrings, Hip adductors',
'Semitendinosus, Semimembranosus, Gracilis, Adductor longus, Adductor magnus',
'Pectineus, Obturator externus, Biceps femoris (mildly), Pelvic floor',
'Hip abduction, Hip flexion, Knee extension',
'frontal',
'Bend the moving leg slightly. Don''t lower as far to the side. Use a shorter strap.',
'Supine, leg raised and opened to the side with strap. Opposite hip grounded.',
'Lower leg closer to floor. Hold longer. Use hand instead of strap.',
'{"inhale":4,"hold":0,"exhale":6}',
13);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(28, 2, 'Prone Ankle Dorsiflexion', 'Lie face down with legs extended. Bend one knee to 90 degrees. Loop a strap around the top of the foot. Gently pull the strap to draw the toes toward the shin (dorsiflexion) while the knee remains bent. This isolates the soleus and deep posterior compartment without gastrocnemius tension.',
'["Keep the knee bent at 90 degrees — this slackens the gastrocnemius and isolates the soleus","Pull the strap gently and steadily — no jerking","You will feel this deep in the lower calf, near the Achilles","Keep your hips pressed into the floor"]',
120, 1, '["strap"]',
'Soleus, Deep posterior compartment',
'Soleus, Tibialis posterior, Flexor hallucis longus, Flexor digitorum longus',
'Achilles tendon, Plantaris, Plantar fascia, Peroneus longus and brevis',
'Ankle dorsiflexion (knee flexed)',
'sagittal',
'Minimal strap pull. Gentle range. Keep ankle relaxed and let strap do the work.',
'Prone, knee bent 90 degrees, strap pulling foot into dorsiflexion. Hips on floor.',
'Increase strap tension. Extend knee slightly toward straight while maintaining dorsiflexion to add gastrocnemius.',
'{"inhale":4,"hold":0,"exhale":6}',
14);

-- DAY 8: Rotational Ham + Lateral Calf
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(29, 1, 'Revolved Head-to-Knee', 'Sit with legs in Head-to-Knee position (one leg extended, one bent with sole against inner thigh). Instead of folding forward, lean laterally over the extended leg. Reach the bottom hand to the inside of the extended foot and the top arm overhead toward the foot. Rotate the chest open toward the ceiling.',
'["Lean to the side first, then rotate the chest open — don''t just twist","Reach the top arm over the ear toward the extended foot","Keep the sit bone of the bent leg grounded","The side bend adds lateral fascial line stretch alongside the hamstring stretch"]',
120, 1, '["block (optional)"]',
'Hamstrings (extended leg), Lateral trunk',
'Biceps femoris, Semitendinosus, Semimembranosus (extended leg), Quadratus lumborum, External obliques, Intercostals (top side)',
'Internal obliques (bottom side), Latissimus dorsi (top side), Erector spinae, Adductors (bent leg), IT band/TFL (top side)',
'Hip flexion, Lateral flexion, Thoracic rotation',
'multi-planar',
'Sit on a block. Place bottom hand on the shin (not foot). Minimal rotation — focus on the side bend.',
'Seated lateral bend over extended leg, chest rotating open. Bottom hand at foot, top arm overhead.',
'Grab the outside of the foot with the top hand. Full rotation — chest faces ceiling. Remove all props.',
'{"inhale":4,"hold":0,"exhale":6}',
15);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(29, 2, 'Standing Cross-Leg Calf', 'Stand upright. Cross one ankle in front of the other. Keeping both legs as straight as possible, fold forward from the hips and reach toward the floor. The back leg (the one behind in the cross) receives an intensified stretch on the lateral calf and peroneal muscles.',
'["Cross at the ankles, not the knees","Keep both legs straight — the cross creates the lateral bias","Fold from the hips and let gravity pull you down","You should feel this on the outer calf and behind the outer ankle of the back leg"]',
120, 1, '["blocks (optional)"]',
'Peroneal muscles, Lateral gastrocnemius',
'Peroneus longus, Peroneus brevis, Gastrocnemius (lateral head)',
'Hamstrings (both legs), Soleus, IT band/TFL, Gluteus maximus, Erector spinae',
'Ankle dorsiflexion, Ankle eversion, Hip flexion',
'multi-planar',
'Bend both knees slightly. Hands on blocks. Don''t fold as deep.',
'Ankles crossed, legs straight, folding forward. Hands toward floor or on blocks.',
'Hold opposite elbows. Pull torso deeper toward shins. Pause longer at end range.',
'{"inhale":4,"hold":0,"exhale":6}',
16);

-- DAY 9: Prop-Assisted + Deep Calf
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(30, 1, 'Chair Hamstring Fold', 'Sit on the edge of a chair with one leg extended straight in front of you, heel on the floor, toes pointing up. Keep the other foot flat on the floor. Sit tall, then hinge forward from the hips over the extended leg, reaching toward the foot. The chair elevation creates a favorable pelvic angle for hamstring access.',
'["Sit near the front edge of the chair — not deep in the seat","Hinge from the hips, not the lower back","Keep the extended leg straight with the kneecap pointing up","Flex the foot of the extended leg to add nerve glide and calf stretch"]',
120, 1, '["chair"]',
'Hamstrings (extended leg)',
'Biceps femoris (long head), Semitendinosus, Semimembranosus',
'Gastrocnemius (with foot flexed), Gluteus maximus, Erector spinae, Thoracolumbar fascia',
'Hip flexion, Knee extension',
'sagittal',
'Keep the extended leg slightly bent. Sit more upright with a gentle forward lean only.',
'Seated on chair edge, one leg extended, hinging forward from hips toward extended foot.',
'Extend both legs. Fold deeper. Use a strap around the foot to pull the torso closer.',
'{"inhale":4,"hold":0,"exhale":6}',
17);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(30, 2, 'Deep Squat Heel Press', 'Lower into a deep squat (Malasana) with feet flat on the floor if possible. Once at the bottom, actively press the heels into the floor while leaning the torso slightly forward. Place hands on the floor in front of you for support. This loads the Achilles tendon and soleus at maximum dorsiflexion under body weight.',
'["Get into your deepest squat first, then focus on driving the heels down","If heels lift, place a rolled towel or thin block under them and work toward flat","Lean the torso forward slightly to shift weight into the heels","Breathe deeply — you are at near-maximal ankle dorsiflexion"]',
120, 0, '["rolled towel or block (optional)"]',
'Soleus, Achilles tendon',
'Soleus (maximally loaded in deep knee flexion), Achilles tendon (calcaneal tendon)',
'Gastrocnemius (shortened at knee but stretched at ankle), Tibialis posterior, Flexor hallucis longus, Plantar fascia, Gluteus maximus, Adductor magnus',
'Ankle dorsiflexion (maximal, weight-bearing), Deep hip flexion',
'sagittal',
'Sit on a low block in the squat. Place a rolled towel under heels. Hands on a stool for balance.',
'Deep squat, heels pressing into floor, torso leaning slightly forward. Hands on floor for support.',
'Remove all props. Heels flat. Pause at bottom with hands in prayer. Shift weight backward over heels.',
'{"inhale":4,"hold":0,"exhale":6}',
18);

-- DAY 10: Integration
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(31, 1, 'Full Splits Prep', 'From a kneeling position, extend the front leg straight forward with the heel on the floor. Keep the back knee on a cushion with the top of the foot flat. Slowly slide the front heel forward and the back knee back, lowering the hips toward the floor. Use blocks under both hands for support. Go only as far as your range allows — this is a preparation, not a full split.',
'["Use blocks under both hands to control your depth — never force a split","Keep the front leg straight and the back thigh vertical as long as possible","Square the hips forward — the back hip wants to rotate open","Tuck the tailbone of the back leg to protect the lower back and deepen the hip flexor stretch"]',
120, 1, '["blocks","knee cushion"]',
'Hamstrings (front leg), Hip flexors (back leg)',
'Biceps femoris (long head), Semitendinosus, Semimembranosus (front leg), Psoas major, Iliacus, Rectus femoris (back leg)',
'Gluteus maximus (front leg), Gastrocnemius (front leg, mildly), Anterior hip capsule (back leg), Adductor magnus (both legs), Sacroiliac ligaments',
'Hip flexion (front leg), Hip extension (back leg), Knee extension (front leg)',
'sagittal',
'Keep hips high on tall blocks. Bend the front knee. Shorter distance between front heel and back knee.',
'Front leg extending forward, back knee on cushion sliding back. Blocks under hands. Hips lowering toward floor.',
'Lower blocks to lowest height. Bring hips closer to floor. Work toward front thigh flat on floor.',
'{"inhale":4,"hold":0,"exhale":6}',
19);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, breathing_pattern, sort_order) VALUES
(31, 2, 'Skandasana', 'From a wide-legged standing position, bend one knee deeply and shift your weight to that side, keeping the other leg straight with the foot flexed and toes pointing toward the ceiling. Lower your hips as far as comfortable. Hands can be on the floor, on a block, or in prayer at the chest. The straight leg receives a deep hamstring and adductor stretch while the bent leg''s ankle is in maximal dorsiflexion.',
'["Keep the straight leg fully extended with toes pointing up — this is the primary stretch target","Sink the hips low to deepen the stretch on the straight leg","The bent knee should track over the toes — keep the heel down for ankle work","This pose integrates everything — hamstrings, adductors, calves, and ankle mobility"]',
120, 1, '["block (optional)"]',
'Hamstrings (straight leg), Adductors (straight leg), Gastrocnemius and Soleus (bent leg)',
'Semitendinosus, Semimembranosus, Gracilis, Adductor magnus, Adductor longus (straight leg), Soleus, Gastrocnemius (bent leg in deep dorsiflexion)',
'Biceps femoris (straight leg), Gluteus maximus (both legs), Peroneus longus and brevis (bent leg), Plantar fascia (bent leg), IT band/TFL (straight leg)',
'Hip abduction, Hip flexion (bent leg), Knee extension (straight leg), Ankle dorsiflexion (bent leg)',
'multi-planar',
'Don''t sink as low. Keep hands on a block. Bend the straight leg slightly.',
'Deep lateral lunge, straight leg with toes up, bent leg heel grounded. Hands on floor or block.',
'Hips near floor. Hands in prayer at chest. Hold at full depth. Transition fluidly side to side.',
'{"inhale":4,"hold":0,"exhale":6}',
20);
