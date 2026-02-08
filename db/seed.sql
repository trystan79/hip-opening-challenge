-- =============================================
-- 21-Day Hip Opening Challenge - Seed Data
-- Source: YOGABODY Posechart Hip Challenge PDF
-- =============================================

-- ROUTINES
INSERT INTO routine (id, name, slug, description, total_days, icon, color) VALUES
(1, 'Hip Opening', 'hip-opening', '21-day progressive hip flexibility program targeting external rotators, adductors, flexors, and deep hip muscles.', 21, 'hip', '#FF6B6B');

-- DAYS (21 days, 3 weeks)
-- Week 1: Foundational
INSERT INTO day (id, week, theme, description, sort_order) VALUES
(1, 1, 'External Rotation + Adductors', 'Introduce the two most fundamental hip opening patterns: external rotation (Pigeon) and adductor lengthening (Butterfly). Floor-based, prop-supported.', 1);
INSERT INTO day (id, week, theme, description, sort_order) VALUES
(2, 1, 'Hip Flexors + Deep Squat', 'Target the anterior hip (hip flexors via Blaster) and posterior chain with a gravity-assisted deep squat. These opposing patterns create balanced hip mobility.', 2);
INSERT INTO day (id, week, theme, description, sort_order) VALUES
(3, 1, 'Supine Hip Opening', 'Gentle supine poses that use gravity to open the hips without load-bearing. Happy Baby targets abduction and external rotation; Thread the Needle isolates the deep rotators.', 3);
INSERT INTO day (id, week, theme, description, sort_order) VALUES
(4, 1, 'Adductors + Hip Flexors', 'Frog is the deepest adductor stretch in the program. Paired with Jackknife Blaster to balance inner thigh opening with anterior hip lengthening.', 4);
INSERT INTO day (id, week, theme, description, sort_order) VALUES
(5, 1, 'Hamstrings + Quads/Ankles', 'Scissors targets the hamstrings (posterior sagittal plane) while Lightning Bolt stretches the quads and ankle dorsiflexors (anterior sagittal plane). Complete sagittal plane coverage.', 5);
INSERT INTO day (id, week, theme, description, sort_order) VALUES
(6, 1, 'Internal Rotation + Adductors', 'Zorro (Z-sit) is one of the few poses that emphasizes internal rotation. Supine Butterfly provides a passive, gravity-assisted adductor stretch to complement.', 6);
INSERT INTO day (id, week, theme, description, sort_order) VALUES
(7, 1, 'Deep Rotators + Prone Opening', 'Closes Week 1 by revisiting external rotation (Thread the Needle at wall) with a new angle, and introducing prone positioning (Prone Butterfly) for a different gravitational load.', 7);

-- Week 2: Intermediate
INSERT INTO day (id, week, theme, description, sort_order) VALUES
(8, 2, 'Lateral Plane + IT Band', 'Introduces frontal plane work. Ninja Squats open the adductors dynamically while Lateral Chain Stretch targets the IT band and lateral hip structures often missed in standard hip routines.', 8);
INSERT INTO day (id, week, theme, description, sort_order) VALUES
(9, 2, 'Deep Hip Flexors + Hamstrings', 'Chair-elevated Psoas Blaster reaches deeper into the psoas than floor variations. Reclined Scissors combines hamstring stretch with chair-assisted passive hold for sustained lengthening.', 9);
INSERT INTO day (id, week, theme, description, sort_order) VALUES
(10, 2, 'Rotational Patterns', 'First day with rotation. Blaster Twist adds thoracic rotation to the hip flexor lunge. Squat Twist combines deep squat with spinal rotation. Tri-planar loading begins.', 10);
INSERT INTO day (id, week, theme, description, sort_order) VALUES
(11, 2, 'Deep External Rotation + Forward Fold', 'Double Pigeon (Fire Log) is an intense external rotation pose. Bound Butterfly deepens the classic butterfly with a forward fold. Both demand the range built in Week 1.', 11);
INSERT INTO day (id, week, theme, description, sort_order) VALUES
(12, 2, 'Cross-Body Wrapping + Internal Rotation', 'Eagle Fold uses the eagle-leg wrap for deep internal rotation and IT band stretch. Cross-Thread is a supine cross-legged variation targeting the deep rotators at a new angle.', 12);
INSERT INTO day (id, week, theme, description, sort_order) VALUES
(13, 2, 'Compound Lunge + Maximal Quad Stretch', 'Swiss Army Knife combines lunge with quad grab and strap — the most complex single-pose setup so far. Saddle (Supta Virasana) is the deepest quad/hip flexor stretch in the program.', 13);
INSERT INTO day (id, week, theme, description, sort_order) VALUES
(14, 2, 'Compound Squat + Asymmetric Quad', 'Closes Week 2 with Butterfly Squat (combining squat depth with adduction) and Half Lightning Bolt (asymmetric quad stretch allowing per-leg attention). Prepares for Week 3 integration.', 14);

-- Week 3: Advanced/Integrated
INSERT INTO day (id, week, theme, description, sort_order) VALUES
(15, 3, 'Asymmetric Multi-Planar', 'Both poses are asymmetric — stretching different muscle groups on opposite legs simultaneously. Fallen Blaster is the most demanding adductor/hip flexor combination. A-Baby allows individual leg attention.', 15);
INSERT INTO day (id, week, theme, description, sort_order) VALUES
(16, 3, 'Standing Table-Assisted', 'Standing versions of foundational patterns. Vertical load vector and single-leg balance add proprioceptive challenge. Table provides leverage for end-range positions.', 16);
INSERT INTO day (id, week, theme, description, sort_order) VALUES
(17, 3, 'Traction-Enhanced Folds', 'Stick/cane provides traction — a novel progressive overload tool that decompresses the spine. Sage Fold targets hamstrings; Long Butterfly targets adductors and medial hamstrings.', 17);
INSERT INTO day (id, week, theme, description, sort_order) VALUES
(18, 3, 'Cross-Body + Deep Squat', 'Eagle Legs compresses the lateral hip; Chair Squat opens it. Compression-then-opening sequence is similar to mobilization with movement in manual therapy.', 18);
INSERT INTO day (id, week, theme, description, sort_order) VALUES
(19, 3, 'Rotational Pigeon + Strap Baby', 'Most complex pigeon variation with thoracic rotation. Bound Baby uses strap for sustained passive tension. Revisits Day 1 and Day 3 themes with maximal complexity.', 19);
INSERT INTO day (id, week, theme, description, sort_order) VALUES
(20, 3, 'Functional Chair + Prop Squat', 'Seated Pigeon is the take-home maintenance pose — doable at any desk. Railroad Squat uses stick traction for near-maximal squat depth. Functional integration focus.', 20);
INSERT INTO day (id, week, theme, description, sort_order) VALUES
(21, 3, 'Culmination: Quad + Full Squat', 'Final day tests cumulative adaptation. Thunderbolt revisits the quad/ankle pattern. Prayer Squat is the ultimate test — deep squat with minimal props, active internal leverage. The squat progression culmination.', 21);

-- =============================================
-- POSES (42 total, 2 per day)
-- Each with full muscle indexing and coaching data
-- =============================================

-- DAY 1
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(1, 1, 'Pigeon', 'From hands and knees, slide your right knee forward toward your right wrist. Extend your left leg straight behind you. Square your hips toward the front. Use a block under your front hip for support. Hold and breathe deeply, allowing gravity to open the hip.',
'["Keep hips square — avoid leaning to one side","Place a block or cushion under the front hip if it doesn''t reach the floor","Walk hands forward to deepen the stretch","Breathe into the front hip — imagine sending breath to the tight areas","Back leg should be straight with the top of the foot on the floor"]',
120, 1, '["yoga block","cushion"]',
'Hip external rotators, Gluteals',
'Piriformis, Obturator internus, Obturator externus, Gemelli (superior and inferior), Gluteus maximus, Gluteus medius',
'IT band/TFL (front leg), Psoas major/Iliacus (back leg hip flexors in extension), Quadratus lumborum',
'External rotation, Hip flexion (front), Hip extension (back)',
'multi-planar',
'Place a tall block or bolster under front hip. Keep torso upright with hands on blocks.',
'Front shin parallel to front of mat, hips squared, torso upright.',
'Walk hands forward and lower torso toward the floor. Remove all props.',
1);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(1, 2, 'Butterfly', 'Sit with the soles of your feet together, knees falling outward. Use blocks under your knees for support if needed. Slowly fold forward from the hips, walking your hands out in front. Let gravity draw your knees toward the floor.',
'["Sit on a block or cushion to tilt pelvis forward","Let gravity do the work — don''t force knees down","Hinge from the hips, not the lower back","Keep soles of feet pressed together","Relax your shoulders and jaw"]',
120, 0, '["yoga blocks","cushion"]',
'Hip adductors, Hip external rotators',
'Adductor longus, Adductor brevis, Gracilis, Adductor magnus (anterior fibers), Pectineus',
'Piriformis, Gluteus medius (in external rotation), Erector spinae (forward fold), Hamstrings (proximal)',
'Hip abduction, External rotation, Hip flexion (forward fold)',
'multi-planar',
'Sit on a tall block, knees supported by blocks. Stay upright — no forward fold.',
'Feet together, fold forward from hips. Blocks under knees optional.',
'Bring feet closer to groin. Remove knee blocks. Fold chest toward feet with forehead resting on blocks.',
2);

-- DAY 2
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(2, 1, 'Blaster', 'From a kneeling position, step one foot forward into a deep lunge. Back knee stays on a cushion on the floor. Hands can rest on a chair or stool for balance. Sink hips forward and down to stretch the back leg hip flexors.',
'["Tuck your tailbone slightly to increase the hip flexor stretch","Front knee stacks over the ankle","Squeeze the glute of the back leg to deepen the stretch","Keep torso upright — avoid leaning forward","Breathe and let gravity pull the hips lower"]',
120, 1, '["chair or stool","knee cushion"]',
'Hip flexors (back leg)',
'Psoas major, Iliacus, Rectus femoris, Sartorius, TFL',
'Anterior hip capsule (iliofemoral ligament), Pectineus, Adductor longus (anterior fibers), Quadratus lumborum',
'Hip extension (back leg)',
'sagittal',
'Keep hands on a tall chair. Don''t sink as deep — keep hips higher.',
'Deep lunge with hands on stool. Back knee on cushion. Hips sinking toward floor.',
'Release hands from support. Arms overhead. Sink hips as low as possible.',
3);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(2, 2, 'Passive Squat', 'Stand facing a stool and hold on for support. Lower into a deep squat, feet wider than hip-width, toes turned slightly outward. Let your hips sink as low as gravity allows. Use the stool to control depth.',
'["Heels can be on a rolled towel if they lift off the floor","Knees track over toes — don''t let them collapse inward","Let the weight of your body pull you deeper","Relax your pelvic floor","Breathe deeply into your belly"]',
120, 0, '["stool","rolled towel (optional)"]',
'Hip extensors, Hip adductors, Ankle dorsiflexors',
'Gluteus maximus, Adductor magnus, Adductor longus, Soleus, Gastrocnemius',
'Piriformis (deep flexion), Erector spinae (lumbar), Pelvic floor, Tibialis posterior',
'Deep hip flexion, Hip abduction, Ankle dorsiflexion',
'multi-planar',
'Hold stool with both hands. Keep hips higher — partial squat depth.',
'Hold stool lightly. Full depth squat with feet flat.',
'Release stool. Hands in prayer at chest. Full depth, minimal support.',
4);

-- DAY 3
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(3, 1, 'Happy Baby', 'Lie on your back. Bring both knees toward your armpits. Grab the outer edges of your feet (or use a strap). Gently pull knees toward the floor alongside your torso. Keep your sacrum and lower back flat on the floor.',
'["Keep your lower back and sacrum on the floor","Pull knees toward armpits, not toward chest","Flex your feet — push soles toward the ceiling","Rock gently side to side to massage the lower back","Relax your shoulders — let arms do the work"]',
120, 0, '["strap (optional)"]',
'Hip adductors, Deep hip external rotators',
'Adductor magnus, Adductor longus, Gracilis, Piriformis, Obturator internus',
'Hamstrings (proximal), Pelvic floor, Sacrotuberous ligament, Erector spinae (pressed into floor)',
'Hip flexion, Hip abduction, External rotation',
'multi-planar',
'Use a strap around each foot. Keep knees wider if lower back lifts.',
'Grab outer edges of feet. Knees beside torso. Sacrum on floor.',
'Pull feet lower toward floor. Straighten legs slightly while maintaining position.',
5);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(3, 2, 'Thread the Needle (supine)', 'Lie on your back. Cross your right ankle over your left knee in a figure-4 shape. Lift your left foot off the floor and thread your right hand through the triangle of your legs. Clasp both hands behind your left thigh and gently pull toward your chest.',
'["Flex the crossed foot to protect the knee","Keep your head and shoulders relaxed on the floor","Press the crossed knee away from you to deepen the stretch","Pull the bottom leg gently toward your chest","Breathe into the hip of the crossed leg"]',
120, 1, '[]',
'Deep hip external rotators (crossed leg)',
'Piriformis, Obturator internus, Gemelli, Gluteus maximus, Gluteus medius',
'Hamstrings (bottom leg), IT band/TFL, Sacroiliac ligaments',
'External rotation, Hip flexion',
'multi-planar',
'Keep the bottom foot on the floor instead of lifting. Press crossed knee away.',
'Figure-4 with bottom leg lifted, hands clasped behind thigh pulling toward chest.',
'Straighten the bottom leg toward ceiling while maintaining the figure-4.',
6);

-- DAY 4
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(4, 1, 'Frog', 'From hands and knees, slowly walk your knees out to the sides. Keep your ankles in line with your knees (shins parallel). Lower onto your forearms. Use cushions under knees. Hold at your edge — let gravity do the work.',
'["Move slowly — this is an intense stretch","Keep ankles in line with knees (90-degree angle)","Support yourself on forearms or use a stool","Breathe into the inner thighs","Don''t push — let gravity gradually deepen the stretch"]',
120, 0, '["knee cushions","stool (optional)"]',
'Hip adductors',
'Adductor longus, Adductor brevis, Adductor magnus, Gracilis, Pectineus',
'Obturator externus, Sartorius, Hamstrings (medial), Pelvic floor',
'Hip abduction',
'frontal',
'Don''t go as wide. Stay on hands instead of forearms. Use cushions under knees.',
'Forearms on floor, knees wide, hips sinking toward floor.',
'Lower chest toward floor. Walk knees wider. Extend arms forward.',
7);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(4, 2, 'Jackknife Blaster', 'From a prone position (face down), bring one knee up toward your armpit, keeping the other leg extended behind you. Use a cushion under the front knee. This combines a hip flexor stretch for the back leg with a deep external rotation for the front leg.',
'["Keep the back leg long and straight","Front knee draws toward armpit","Use cushion under the front knee","Relax into the floor — let gravity work","Breathe deeply and hold at your edge"]',
120, 1, '["cushion"]',
'Hip flexors (back leg), Hip external rotators (front leg)',
'Psoas major, Iliacus, Rectus femoris (back leg), Piriformis, Gluteus maximus (front leg)',
'TFL, Adductor longus, Quadratus lumborum, Pelvic floor',
'Hip extension (back leg), External rotation + Hip flexion (front leg)',
'multi-planar',
'Keep torso higher on hands. Less range on front knee.',
'Prone with front knee toward armpit, back leg extended. Cushion support.',
'Lower torso flat. Press front knee wider. Extend back leg fully.',
8);

-- DAY 5
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(5, 1, 'Scissors', 'Stand facing a wall with hands on the wall at shoulder height. Step one foot back into a wide stance. Keep both legs straight. Press the back heel toward the floor and lean forward, hinging at the hips to stretch the back of the front leg.',
'["Keep both legs straight — micro-bend is OK","Hinge from the hips, not the lower back","Press the back heel down for calf stretch too","Hands on wall or chair for balance","Square your hips — both hip bones face forward"]',
120, 1, '["wall or chair"]',
'Hamstrings (front leg), Calves (back leg)',
'Biceps femoris (long head), Semitendinosus, Semimembranosus, Gastrocnemius, Soleus (back leg)',
'Gluteus maximus (front leg), Erector spinae, Plantar fascia (back foot), Piriformis',
'Hip flexion (front leg), Ankle dorsiflexion (back leg)',
'sagittal',
'Keep hands on a tall chair. Don''t hinge as deep. Bend front knee slightly.',
'Wide stance, both legs straight, hinging forward over front leg. Hands on wall.',
'Place hands on floor. Bring forehead toward shin. Decrease stance width for more intensity.',
9);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(5, 2, 'Lightning Bolt', 'Sit on your heels (Vajrasana). If this is too intense, place a cushion between your calves and sit bones. Slowly lean back, placing hands behind you for support. Only go as far back as comfortable.',
'["Keep knees together","Sit on a cushion or block between your heels if needed","Engage your core as you lean back","Don''t force — go only to your edge","Breathe into the front of the thighs and ankles"]',
120, 0, '["cushion or block"]',
'Quadriceps, Hip flexors, Ankle dorsiflexors',
'Rectus femoris, Vastus lateralis/medialis/intermedius, Psoas major, Iliacus, Tibialis anterior',
'Patellar ligament, Anterior knee capsule, Anterior ankle ligaments, Abdominal wall (when reclining)',
'Knee flexion, Hip extension, Ankle plantarflexion',
'sagittal',
'Sit on a tall block between heels. Stay upright — no lean back.',
'Sit on heels, lean back onto hands. Cushion under sit bones if needed.',
'Lean all the way back to floor (Supta Virasana). Remove all props.',
10);

-- DAY 6
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(6, 1, 'Zorro', 'Sit with both legs bent, knees falling to one side in a Z-shape (one shin in front, one shin to the side/behind). This creates internal rotation in one hip and external rotation in the other. Sit tall. Switch sides.',
'["Sit on a block if your hips are tight","Try to keep both sit bones grounded","Keep your spine tall","The back leg creates internal rotation — that''s the target","Breathe and relax into the position"]',
120, 1, '["block (optional)"]',
'Hip internal rotators, Hip external rotators',
'Gluteus medius, Gluteus minimus, TFL (internal rotation leg), Piriformis, Obturators (external rotation leg)',
'Adductor group, Quadratus lumborum (asymmetric sitting), IT band',
'Internal rotation (back leg), External rotation (front leg)',
'transverse',
'Sit on a tall block. Don''t worry if back knee lifts — it will improve.',
'Z-sit with both sit bones grounded. Spine tall.',
'Fold forward over the front shin. Remove block support.',
11);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(6, 2, 'Supine Butterfly', 'Lie on your back. Bring the soles of your feet together and let your knees fall open. Use a strap around your feet if desired. Place blocks under your knees for support. Let gravity open the hips.',
'["Let gravity do all the work — completely passive","Place blocks under knees if the stretch is too intense","Keep your lower back neutral on the floor","Arms can rest by your sides or on your belly","Close your eyes and focus on deep breathing"]',
120, 0, '["strap (optional)","blocks (optional)"]',
'Hip adductors',
'Adductor longus, Adductor brevis, Gracilis, Pectineus, Adductor magnus (anterior fibers)',
'Pelvic floor, Hip external rotators (mildly), Psoas (in supine extension)',
'Hip abduction, External rotation',
'frontal',
'Blocks under both knees. Feet farther from groin.',
'Supine, soles together, knees open. Gravity-assisted.',
'Bring feet closer to groin. Remove knee blocks. Use strap to gently pull feet closer.',
12);

-- DAY 7
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(7, 1, 'Thread the Needle @ Wall', 'Sit facing a wall. Place the soles of your feet on the wall with knees bent at 90 degrees. Cross one ankle over the opposite knee in a figure-4. Gently press the crossed knee toward the wall to deepen.',
'["Sit on a block to elevate your hips","Press the crossed knee gently toward the wall","Flex the foot of the crossed leg","Sit tall — don''t round your back","The wall provides consistent resistance"]',
120, 1, '["wall","block (optional)"]',
'Deep hip external rotators',
'Piriformis, Obturator internus, Obturator externus, Gemelli, Gluteus medius',
'IT band/TFL, Hamstrings (mildly), Sacroiliac ligaments',
'External rotation, Hip flexion',
'multi-planar',
'Sit farther from wall. Less pressure on crossed knee.',
'Seated figure-4 with feet on wall, pressing crossed knee toward wall.',
'Sit closer to wall. Fold torso forward over crossed legs.',
13);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(7, 2, 'Prone Butterfly', 'Lie face down. Bring the soles of your feet together behind you (butterfly legs but face down). Use a strap around your feet. Let your knees fall apart. Rest your forehead on your hands.',
'["This is an unusual position — go slowly","Use a strap to keep feet together","Let gravity pull knees toward the floor","Keep breathing deeply","If too intense on knees, place cushions under thighs"]',
120, 0, '["strap (optional)","cushions (optional)"]',
'Hip adductors, Hip external rotators',
'Adductor longus, Adductor brevis, Gracilis, Piriformis, Gluteus medius',
'Pelvic floor, Quadriceps (mild, in knee flexion), Erector spinae',
'Hip abduction, External rotation, Knee flexion',
'multi-planar',
'Place cushions under thighs. Don''t force knees apart.',
'Prone butterfly with soles together, knees falling apart. Strap around feet.',
'Press hips into floor. Allow knees to spread wider. Remove strap.',
14);

-- DAY 8
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(8, 1, 'Ninja Squats', 'Stand with feet wide apart. Shift your weight to one side, bending that knee deeply while keeping the other leg straight. Use a stool for balance. Hold at the bottom. This is a deep lateral lunge.',
'["Keep the straight leg fully extended","Point the straight leg toes up toward ceiling","Sink your hips low — use a stool for balance","Keep your chest lifted","Press through the bent foot''s heel"]',
120, 1, '["stool or chair"]',
'Hip adductors (straight leg), Hip extensors (bent leg)',
'Adductor longus, Adductor magnus, Gracilis (straight leg), Gluteus maximus, Gluteus medius (bent leg)',
'Hamstrings (medial, straight leg), IT band/TFL, Soleus/Gastrocnemius (bent leg ankle)',
'Hip abduction (straight leg), Deep hip flexion (bent leg)',
'frontal',
'Don''t sink as low. Keep both hands on a stool.',
'Deep lateral lunge with one hand on stool. Straight leg fully extended.',
'Release stool. Place hands on floor. Sink hips lower.',
15);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(8, 2, 'Lateral Chain Stretch', 'Lie on your side, propped on your elbow. Extend the top leg behind you or cross it over the bottom leg. Allow the hip to open sideways. Use a block under your side for support.',
'["Keep your body in a long line","Breathe into the lateral hip","Use a block under your side for comfort","Don''t collapse into the bottom shoulder","Subtle adjustments change the stretch target"]',
120, 1, '["block (optional)"]',
'IT band, Lateral hip complex',
'TFL, IT band, Gluteus medius, Gluteus minimus, Vastus lateralis',
'Quadratus lumborum, External obliques, Piriformis, Peroneal muscles',
'Lateral hip opening, Side-lying abduction',
'frontal',
'Use block support. Bend bottom knee for stability.',
'Side-lying with top leg extended. Block under side optional.',
'Remove block. Extend top arm overhead for full lateral chain stretch.',
16);

-- DAY 9
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(9, 1, 'Psoas Blaster (chair)', 'Place one foot on a chair seat behind you. Lower into a deep lunge with the front foot on the floor. The chair elevates the back foot, creating a deeper hip extension. Hands on the chair or stool for balance.',
'["The back foot elevation dramatically deepens the psoas stretch","Tuck your tailbone to maximize the stretch","Keep front knee over ankle","Squeeze the glute of the back leg","This targets the deep psoas — you may feel it in your lower back/abdomen"]',
120, 1, '["chair","knee cushion"]',
'Deep hip flexors (back leg)',
'Psoas major (primary target), Iliacus, Rectus femoris, TFL',
'Anterior hip capsule (iliofemoral ligament), Pectineus, Adductor longus (anterior fibers), Quadratus lumborum',
'Hip extension (maximal, back leg)',
'sagittal',
'Use a lower surface for back foot. Keep hips higher.',
'Deep lunge with back foot elevated on chair. Hands on support.',
'Release hand support. Arms overhead. Deeper hip sink.',
17);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(9, 2, 'Reclined Scissors', 'Lie on your back near a chair. Place one heel on the chair seat. Use a strap around the foot. Extend the leg toward the ceiling. The other leg remains on the floor. Gently pull the raised leg toward you with the strap.',
'["Keep the bottom leg extended on the floor","Use a strap around the ball of the foot","Don''t force — let the strap provide gentle, sustained tension","Keep your hips on the floor — both sides","Breathe into the back of the raised leg"]',
120, 1, '["chair","strap"]',
'Hamstrings (raised leg), Hip flexors (floor leg)',
'Biceps femoris, Semitendinosus, Semimembranosus (raised leg), Psoas major, Iliacus (floor leg in extension)',
'Gastrocnemius (raised leg), Gluteus maximus (raised leg), Erector spinae',
'Hip flexion (raised leg), Hip extension (floor leg)',
'sagittal',
'Keep raised leg knee slightly bent. Use strap for support.',
'Raised leg extended toward ceiling with strap. Floor leg straight on ground.',
'Pull raised leg closer. Straighten completely. Remove strap — use hands.',
18);

-- DAY 10
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(10, 1, 'Blaster Twist', 'Start in the Blaster lunge position (Day 2). Once settled, rotate your torso toward the front knee. Place the opposite hand on the outside of the front knee. Open the chest toward the ceiling.',
'["Establish the lunge first, then add rotation","Rotate from the thoracic spine, not lumbar","Keep the back hip sinking forward","Open your chest toward the ceiling","The twist adds a spiral line stretch to the hip flexor stretch"]',
120, 1, '["knee cushion","stool (optional)"]',
'Hip flexors (back leg), Trunk rotators',
'Psoas major, Iliacus, Rectus femoris (back leg), External obliques, Internal obliques, Intercostals',
'Thoracolumbar fascia, Pectoral minor, Quadratus lumborum, IT band/TFL',
'Hip extension (back leg), Thoracic rotation',
'multi-planar',
'Keep hand on stool for balance. Gentle rotation only.',
'Deep lunge with torso rotation. Hand on outside of front knee.',
'Full rotation with arm extended toward ceiling. Release all support.',
19);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(10, 2, 'Squat Twist', 'From a deep squat (like Passive Squat), place one hand on the floor and rotate your torso, extending the other arm toward the ceiling. Keep your hips low. Use a stool for support.',
'["Get into your deepest squat first, then add the twist","Keep your hips low throughout the rotation","Press the elbow into the inner knee to help rotate","Look up toward the extended hand","Breathe into the twist — exhale to rotate deeper"]',
120, 1, '["stool"]',
'Hip extensors, Hip adductors, Trunk rotators',
'Gluteus maximus, Adductor magnus, Adductor longus (squat), External obliques, Internal obliques (rotation)',
'Piriformis, Soleus, Erector spinae, Intercostals, Thoracolumbar fascia',
'Deep hip flexion, Hip abduction, Thoracic rotation',
'multi-planar',
'Use stool for support. Stay in partial squat depth. Gentle rotation.',
'Deep squat with one hand on floor, torso rotating, opposite arm to ceiling.',
'Release all support. Full rotation. Add a bind if possible.',
20);

-- DAY 11
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(11, 1, 'Double Pigeon', 'Sit with your right shin stacked directly on top of your left shin, both shins parallel to the front edge of the mat. Knees and ankles should be stacked. If this is too intense, sit on a chair with legs crossed. Sit tall.',
'["This is also called Fire Log pose (Agnistambhasana)","Stack the shins — ankle on knee, knee on ankle","If shins won''t stack, sit on a chair with ankle on opposite knee","Sit on a block to help with pelvic tilt","Flex both feet to protect the knees"]',
120, 1, '["block","chair (regression)"]',
'Deep hip external rotators, Gluteals',
'Piriformis, Obturator internus, Obturator externus, Gemelli, Gluteus maximus, Gluteus medius',
'IT band/TFL, Adductors (compressed), Hamstrings (proximal)',
'External rotation, Hip flexion',
'multi-planar',
'Sit on a chair. Cross ankle over opposite knee (figure-4). Sit tall.',
'Shins stacked on floor. Sit on block. Spine tall.',
'Fold forward over stacked shins. Remove block. Chest toward shins.',
21);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(11, 2, 'Bound Butterfly', 'Sit in Butterfly position (soles of feet together, knees apart). Fold forward from the hips, reaching your hands forward. Use blocks under your hands or forehead. Allow the torso to round gently over your legs.',
'["This deepens the standard Butterfly from Day 1","Fold from the hips first, then allow the spine to round","Blocks under forehead if you can''t reach the floor","Keep soles of feet pressed together throughout","Each exhale, soften deeper into the fold"]',
120, 0, '["blocks","stool (optional for forehead)"]',
'Hip adductors, Spinal extensors',
'Adductor longus, Adductor brevis, Gracilis, Pectineus (butterfly), Erector spinae, Multifidus (forward fold)',
'Piriformis, Gluteus maximus, Thoracolumbar fascia, Hamstrings (proximal)',
'Hip abduction, External rotation, Hip flexion, Spinal flexion',
'multi-planar',
'Stay more upright. Hands on blocks in front. Don''t round spine.',
'Full forward fold over butterfly legs. Blocks under forehead.',
'Bring feet closer to groin. Chest to feet. Remove all blocks.',
22);

-- DAY 12
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(12, 1, 'Eagle Fold', 'Sit on a chair or on the floor. Wrap one leg over the other in an eagle (Garudasana) wrap — thigh over thigh, foot hooks behind calf. Then fold forward from the hips. This creates a deep wrapping compression of the hip.',
'["Cross the thigh first, then try to hook the foot behind the calf","If the foot won''t hook, just cross the thighs","Fold forward from the hips to deepen","You''ll feel this deep in the outer hip and IT band","Keep breathing — this is intense for many people"]',
120, 1, '["chair (optional)"]',
'Deep hip external rotators, IT band/Lateral hip',
'Piriformis, Gluteus medius, Gluteus minimus, IT band/TFL, Gluteus maximus',
'Sacroiliac ligaments, Quadratus lumborum, Erector spinae (forward fold), Hamstrings (proximal)',
'Hip adduction, Internal rotation (relative), Hip flexion',
'multi-planar',
'Sit on chair. Cross thighs without foot hook. Stay upright.',
'Seated eagle legs (foot hooked) with forward fold.',
'Floor seated. Deep fold. Press elbows into thighs for more compression.',
23);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(12, 2, 'Cross-Thread', 'Lie on your back. Cross one leg over the other (like crossing your legs while sitting). Pull both knees toward your chest. Then thread your hands around the bottom leg and pull gently. Feel the stretch in the outer hip of the top leg.',
'["Cross your legs as if sitting in a chair, then lie back","Pull both knees toward chest","Thread hands behind the bottom thigh","The top leg''s outer hip gets the stretch","Keep both shoulders on the floor"]',
120, 1, '[]',
'Deep hip external rotators, IT band',
'Piriformis, Gluteus medius, Gluteus minimus, IT band/TFL, Obturator internus',
'Hamstrings (bottom leg), Sacroiliac ligaments, Erector spinae',
'External rotation, Hip flexion, Hip adduction (top leg)',
'multi-planar',
'Keep feet on floor with legs crossed. Gently pull bottom knee to chest.',
'Supine cross-legged, both knees pulled to chest. Hands behind bottom thigh.',
'Pull legs closer to chest. Straighten bottom leg slightly for more stretch.',
24);

-- DAY 13
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(13, 1, 'Swiss Army Knife', 'From a kneeling lunge, use a strap around the back foot. Reach back with the same-side hand and grab the strap. Pull the back heel toward the glute while maintaining the lunge. This stretches the hip flexor AND quad simultaneously. Use a chair for balance.',
'["Set up the lunge first, then add the quad grab","Use a strap — don''t strain your shoulder reaching","Keep the front knee over the ankle","Tuck the tailbone for maximum hip flexor stretch","This is a compound stretch — hip flexor + quad + shoulder"]',
120, 1, '["strap","chair","knee cushion"]',
'Hip flexors + Quadriceps (back leg)',
'Psoas major, Iliacus, Rectus femoris, Vastus group (all stretched simultaneously)',
'Anterior hip capsule, Patellar ligament, Shoulder extensors (reaching back), TFL, Abdominal wall',
'Hip extension + Knee flexion (back leg)',
'sagittal',
'Skip the quad grab. Just do the Blaster lunge with chair support.',
'Lunge with strap around back foot, pulling heel toward glute. Chair for balance.',
'Release chair. Grab foot directly (no strap). Sink hips lower.',
25);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(13, 2, 'Saddle', 'Start kneeling (Vajrasana). Slowly separate your feet wider than your hips and sit between them. Then lean back onto your hands, then elbows, and eventually your back. This is Supta Virasana — the deepest quad stretch in the program.',
'["Go slowly — this is very intense on the knees and quads","Use blocks or cushions behind you for support","Keep knees together (or as close as comfortable)","If your knees hurt, STOP and use the regression","Breathe deeply — this targets the entire anterior chain"]',
120, 0, '["blocks","cushions","bolster (optional)"]',
'Quadriceps, Hip flexors',
'Rectus femoris (maximally stretched), Vastus lateralis, Vastus medialis, Vastus intermedius, Psoas major, Iliacus',
'Patellar ligament, Anterior knee capsule, Anterior ankle ligaments, Abdominal wall, Tibialis anterior',
'Knee flexion (maximal), Hip extension, Ankle plantarflexion',
'sagittal',
'Stay upright in Vajrasana. Sit on a block between heels. Don''t lean back.',
'Sit between heels. Lean back onto bolster or stacked blocks.',
'Lean all the way back to floor. Arms overhead. No props.',
26);

-- DAY 14
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(14, 1, 'Butterfly Squat', 'From a deep squat, bring feet wider and turn toes outward. Let knees press outward. Use a stick or stool for balance. Combine the squat depth with a butterfly-like abduction. Sit on a block if needed.',
'["This combines the deep squat with adductor opening","Feet wider than squat, toes turned out more","Use a stick or stool in front for balance","Press knees outward with elbows if in deep squat","Breathe into the groin area"]',
120, 0, '["block","stick or stool"]',
'Hip adductors, Hip extensors, Ankle dorsiflexors',
'Adductor longus, Adductor magnus, Gracilis, Gluteus maximus, Soleus, Gastrocnemius',
'Piriformis (deep flexion + external rotation), Pelvic floor, Erector spinae, TFL/IT band',
'Deep hip flexion, Hip abduction, External rotation, Ankle dorsiflexion',
'multi-planar',
'Sit on a tall block. Hold stool firmly. Partial depth.',
'Deep wide squat with knees pressing outward. Stick/stool for balance.',
'Release support. Prayer hands pressing knees wider. Full depth.',
27);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(14, 2, 'Half Lightning Bolt', 'Sit with one leg in Vajrasana (foot beside hip, knee bent) and the other leg extended straight forward. Sit on a block under the bent-leg hip. Progressions: lean back onto hands, then further.',
'["This is an asymmetric version of Lightning Bolt (Day 5)","Sit on a block under the bent-leg hip","Keep the straight leg active — toes pointing up","Only lean back as far as comfortable","The asymmetry lets you go deeper on each side"]',
120, 1, '["block"]',
'Quadriceps + Hip flexors (bent leg)',
'Rectus femoris, Vastus group, Psoas major, Iliacus (bent leg), Tibialis anterior',
'Hamstrings (straight leg, mildly), Abdominal wall (reclining), Quadratus lumborum (asymmetric), Sacroiliac joint',
'Knee flexion + Hip extension (bent leg)',
'sagittal',
'Sit on tall block. Stay upright. Don''t lean back.',
'One leg in Vajrasana, one extended. Sit on block. Lean back onto hands.',
'Remove block. Lean all the way back. Straight leg active.',
28);

-- DAY 15
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(15, 1, 'Fallen Blaster', 'From a wide stance, lower into a side lunge. Let the bent leg''s hip come toward the floor. The straight leg extends to the side. Use a stool and cushions for support. This is a deep adductor stretch combined with hip flexor work.',
'["This is the most demanding adductor + hip flexor combination","Use a stool for balance and cushions for knee","Keep the straight leg fully extended","Sink the hip as low as possible toward the floor","Breathe into the inner thigh of the straight leg"]',
120, 1, '["stool","cushions"]',
'Hip adductors (straight leg), Hip flexors (bent leg), Lateral chain',
'Adductor longus, Adductor magnus, Gracilis (straight leg), Psoas major, Iliacus, Rectus femoris (bent leg), Gluteus medius/TFL (lateral)',
'Quadratus lumborum, Obliques, Pelvic floor, Obturator externus, IT band',
'Hip abduction (straight leg), Hip extension (bent leg)',
'multi-planar',
'Don''t sink as low. Keep both hands on stool. Higher hip position.',
'Deep side lunge with hip near floor. Stool support. Straight leg extended.',
'Release stool. Lower torso toward floor. Full split progression.',
29);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(15, 2, 'A-Baby', 'Lie on your back. Bring one knee toward the armpit (Happy Baby position) while the other leg stays extended flat on the floor. Grab the foot of the bent leg or use a strap. This creates simultaneous opposite-leg stretching.',
'["One leg in Happy Baby, one leg straight on floor","Pull the bent knee toward your armpit","Keep the straight leg active and flat on the floor","The straight leg gets a hip flexor stretch from gravity","Flex the foot of the bent leg"]',
120, 1, '["strap (optional)"]',
'Deep hip external rotators + Adductors (bent leg), Hip flexors (straight leg)',
'Piriformis, Obturator internus, Gluteus medius, Adductor magnus, Gracilis (bent leg), Psoas major, Iliacus, Rectus femoris (straight leg)',
'Pelvic floor, Hamstrings (bent leg proximal), Sacrotuberous ligament, Erector spinae',
'Hip flexion + Abduction + External rotation (bent leg), Hip extension (straight leg)',
'multi-planar',
'Use strap on bent foot. Keep straight leg relaxed.',
'One leg in Happy Baby, one leg flat on floor. Hand on foot of bent leg.',
'Pull bent leg lower. Press straight leg firmly into floor.',
30);

-- DAY 16
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(16, 1, 'Standing Psoas', 'Stand at a table. Extend one leg behind you, placing the top of the foot or shin on the table surface. The standing leg stays grounded. This is a standing version of the Blaster with the table allowing greater hip extension.',
'["The table creates an elevated surface for deeper hip extension","Keep your torso upright — don''t lean forward","Tuck the tailbone of the back leg","Squeeze the glute of the back leg","Hold the table for balance with your hands"]',
120, 1, '["table or counter"]',
'Hip flexors (back leg)',
'Psoas major (primary — standing allows near-maximal hip extension), Iliacus, Rectus femoris, Sartorius, TFL',
'Anterior hip capsule (iliofemoral ligament), Quadratus lumborum, Abdominal wall, Gluteus maximus/medius (standing leg stabilization)',
'Hip extension (maximal)',
'sagittal',
'Use a lower surface (chair seat). Less hip extension range.',
'Standing with back leg shin on table. Torso upright. Hands on table.',
'Release hands. Arms overhead. Deeper hip sink.',
31);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(16, 2, 'Standing Pigeon', 'Stand at a table. Place one shin on the table surface in a pigeon-like position (shin roughly parallel to table edge, knee bent). Fold forward over the leg on the table.',
'["Place shin on table — adjust the angle for comfort","Fold forward from the hips to deepen","Keep the standing leg slightly bent","The table height creates a different angle than floor pigeon","Hold the table for balance"]',
120, 1, '["table or counter"]',
'Deep hip external rotators + Gluteals (table leg)',
'Piriformis, Obturator internus, Gemelli, Obturator externus, Gluteus maximus, Gluteus medius',
'IT band/TFL, Hamstrings (proximal), Hip flexors (standing leg), Erector spinae (forward fold)',
'External rotation + Flexion (table leg)',
'multi-planar',
'Use a lower surface. Keep torso more upright. Less fold.',
'Shin on table in pigeon position. Fold forward over table leg.',
'Use a higher surface. Deeper fold. Release hand support.',
32);

-- DAY 17
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(17, 1, 'Sage Fold', 'Sit on a stool or block with legs extended straight forward. Hold a stick or cane overhead. Reach forward with the stick, pulling your torso into a deep forward fold over your straight legs. The stick provides traction.',
'["The stick creates a pulling force that decompresses the spine","Sit on a block or stool to tilt the pelvis forward","Keep legs straight — micro-bend in knees is OK","Reach the stick past your feet if possible","Breathe into the backs of the legs"]',
120, 0, '["stick or cane","stool or block"]',
'Hamstrings, Spinal extensors, Gluteals',
'Biceps femoris (long head), Semitendinosus, Semimembranosus, Gluteus maximus, Erector spinae, Multifidus',
'Piriformis, Sacrotuberous ligament, Thoracolumbar fascia, Latissimus dorsi (overhead stick reach), Gastrocnemius',
'Hip flexion, Knee extension, Spinal flexion',
'sagittal',
'Sit on tall stool. Bend knees slightly. Small forward lean.',
'Seated forward fold with stick reaching past feet. Sit on block.',
'Sit on floor (no elevation). Pull deeper with stick. Forehead toward shins.',
33);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(17, 2, 'Long Butterfly', 'Sit in a butterfly position but with feet far from the pelvis (creating a longer diamond shape). Hold a stick anchored to a stand or held overhead. Fold forward using the stick for traction. Blocks under knees optional.',
'["The ''long'' butterfly has feet far from pelvis — this adds hamstring stretch","The stick provides traction to pull you deeper","Keep soles of feet together even with feet far away","Fold from the hips, not the lower back","Breathe into the inner thighs and backs of legs"]',
120, 0, '["stick or cane","stand or anchor point","blocks (optional)"]',
'Hip adductors, Spinal extensors, Hamstrings (medial)',
'Adductor longus, Adductor brevis, Gracilis, Adductor magnus, Semitendinosus, Semimembranosus, Erector spinae, Multifidus',
'Piriformis, Gluteus maximus, Thoracolumbar fascia, Latissimus dorsi (stick traction)',
'Hip abduction, External rotation, Hip flexion, Spinal flexion',
'multi-planar',
'Feet closer to pelvis (standard butterfly). No forward fold. Sit on block.',
'Long butterfly (feet far) with stick traction. Forward fold.',
'Chest toward feet. Deeper fold with stick pulling. Remove blocks.',
34);

-- DAY 18
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(18, 1, 'Eagle Legs', 'Sit on the floor or a chair. Wrap one thigh over the other (eagle wrap). If possible, hook the top foot behind the bottom calf. Pull your knees toward your chest. Can also be done supine, pulling wrapped legs to chest.',
'["Cross thigh over thigh first, then try to hook the foot","Pull knees toward chest for deeper stretch","You''ll feel this in the outer hip and IT band","Can be done seated, or lie down and pull legs in","This creates intense compression of the lateral hip"]',
120, 1, '[]',
'Deep hip external rotators, IT band/Lateral hip, Gluteals',
'Piriformis, Gluteus medius, Gluteus minimus, Gluteus maximus, IT band/TFL, Obturator internus, Gemelli',
'Hamstrings (proximal), Sacroiliac ligaments, Quadratus lumborum, Erector spinae (forward fold)',
'Hip adduction, Internal rotation (relative), Hip flexion',
'multi-planar',
'Seated on chair. Cross thighs without foot hook. Stay upright.',
'Seated or supine eagle wrap with foot hooked. Pull knees to chest.',
'Supine eagle legs pulled tightly to chest. Add forward fold if seated.',
35);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(18, 2, 'Chair Squat', 'Stand holding the back of a folding chair. Lower into a deep squat while holding the chair for support. Allow your hips to sink as low as possible. Feet can be wider than hip-width.',
'["The chair provides adjustable support","Lean back slightly to counterbalance your weight","Feet flat — use a rolled towel under heels if needed","Let the weight of your body pull you deeper","Progression: reduce how much you hold the chair"]',
120, 0, '["folding chair"]',
'Hip extensors, Hip adductors, Ankle dorsiflexors',
'Gluteus maximus, Gluteus medius, Adductor magnus, Adductor longus, Gracilis, Soleus, Gastrocnemius',
'Piriformis (deep flexion), Pelvic floor, Erector spinae, Tibialis posterior, Peroneal muscles',
'Deep hip flexion, Hip abduction, External rotation, Ankle dorsiflexion',
'multi-planar',
'Partial squat. Hold chair firmly with both hands.',
'Deep squat holding chair. Hips as low as possible. Feet flat.',
'Minimal chair support (fingertips only). Full depth. Flat feet.',
36);

-- DAY 19
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(19, 1, 'Twisted Pigeon', 'Set up in Pigeon pose (Day 1). Once settled, rotate your torso away from the front leg. Place the opposite hand on the floor behind you and the front hand on the front knee. Open your chest toward the ceiling.',
'["Establish the pigeon first, then add the twist","Rotate from the thoracic spine — keep hips squared","The twist adds a rotational component to the pigeon","Open the chest and look over the back shoulder","Use a cushion under the front hip as needed"]',
120, 1, '["cushion","stool (optional)"]',
'Deep hip external rotators + Hip flexors + Trunk rotators',
'Piriformis, Obturators, Gemelli, Gluteus medius/maximus (front leg), Psoas major, Iliacus, Rectus femoris (back leg), External obliques, Internal obliques, Intercostals',
'TFL/IT band (front leg), Thoracolumbar fascia, Pectoral minor, Serratus anterior, Quadratus lumborum',
'External rotation (front leg), Hip extension (back leg), Thoracic rotation',
'multi-planar',
'Use stool support. Gentle rotation. Cushion under front hip.',
'Pigeon with torso rotation. Hand behind on floor, other on front knee.',
'Full rotation. Look over back shoulder. Release all support. Deep twist.',
37);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(19, 2, 'Bound Baby', 'Lie on your back in Happy Baby position. Loop a strap around both feet. Use the strap to pull your feet toward the floor while keeping your knees wide. The strap provides consistent passive tension that is more sustainable than hand grip.',
'["The strap allows a longer, more sustained hold than hands alone","Pull gently and consistently — no bouncing","Keep sacrum and lower back on the floor","Knees fall wide toward armpits","This is a progression of Day 3''s Happy Baby"]',
120, 0, '["strap"]',
'Hip adductors, Deep hip external rotators, Hip extensors',
'Adductor magnus, Adductor longus, Gracilis, Piriformis, Obturator internus, Gluteus maximus, Gluteus medius',
'Pelvic floor, Hamstrings (proximal), Sacrotuberous ligament, Sacrospinous ligament, Erector spinae',
'Hip flexion, Hip abduction, External rotation',
'multi-planar',
'Shorter strap (less range). Keep knees closer together.',
'Happy Baby with strap. Feet pulled toward floor. Knees wide.',
'Longer strap range. Pull feet lower. Straighten legs slightly.',
38);

-- DAY 20
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(20, 1, 'Seated Pigeon', 'Sit on a chair. Cross one ankle over the opposite knee (figure-4 position). Sit tall, then fold forward from the hips. This is the most accessible external rotation stretch — doable at any desk.',
'["This is the take-home maintenance pose — do this daily at your desk","Cross ankle over opposite knee","Flex the crossed foot to protect the knee","Sit tall first, then fold forward","Press the crossed knee gently downward for more stretch"]',
120, 1, '["chair"]',
'Deep hip external rotators, Gluteals',
'Piriformis (primary — 90-degree hip flexion is optimal for piriformis stretch), Obturator internus, Gemelli, Gluteus medius, Gluteus maximus, Gluteus minimus',
'IT band/TFL, Hamstrings (proximal, with forward fold), Erector spinae (forward fold)',
'External rotation, Hip flexion, Hip adduction',
'multi-planar',
'Stay upright. No forward fold. Just the figure-4 position.',
'Seated figure-4. Fold forward from hips. Press crossed knee down.',
'Move to floor seated. Deeper fold. Chest toward shin.',
39);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(20, 2, 'Railroad Squat', 'From a deep squat position, hold a stick (cane) placed vertically on a block for balance and traction. Use the stick to pull your torso upright while sitting deep in the squat. Block under heels if needed.',
'["The stick provides traction to sit deeper and stay upright","Place the stick on a block or stable surface","Pull yourself upright using the stick","Feet flat if possible — block under heels if needed","This is near-maximal squat depth with spinal support"]',
120, 0, '["stick or cane","block"]',
'Hip extensors, Hip adductors, Ankle dorsiflexors',
'Gluteus maximus, Gluteus medius, Adductor magnus, Adductor longus, Gracilis, Soleus, Gastrocnemius',
'Piriformis (deep flexion), Pelvic floor, Erector spinae (upright with stick support), Tibialis posterior, Peroneal muscles',
'Deep hip flexion, Hip abduction, External rotation, Ankle dorsiflexion',
'multi-planar',
'Block under heels. Hold stick firmly. Partial depth.',
'Deep squat with stick on block for traction. Torso upright. Feet flat.',
'Reduce stick support. Full depth. Flat feet. Upright independently.',
40);

-- DAY 21
INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(21, 1, 'Thunderbolt', 'Kneel (Vajrasana) using a chair for hand support. Sit on your heels. Progress to sitting between your heels. This revisits the Lightning Bolt pattern with chair assistance for deeper, sustained holds.',
'["Start by just kneeling on your heels with chair support","Progress by separating feet wider and sitting between them","Use the chair to control how much weight goes into the stretch","Keep your spine tall","This tests the quad and ankle flexibility built over 3 weeks"]',
120, 0, '["chair"]',
'Quadriceps, Hip flexors, Ankle dorsiflexors',
'Rectus femoris, Vastus lateralis, Vastus medialis, Vastus intermedius, Psoas major, Iliacus, Tibialis anterior, Extensor digitorum longus',
'Patellar ligament, Anterior knee capsule, Anterior ankle ligaments, Plantar fascia',
'Knee flexion, Ankle plantarflexion, Hip extension (mild)',
'sagittal',
'Sit ON heels (not between). Full chair support.',
'Sit between heels with chair for hand support. Spine tall.',
'Release chair. Independent kneeling seat between heels. Lean back slightly.',
41);

INSERT INTO pose (day_id, pose_number, name, instruction, cues, duration_seconds, is_bilateral, props, primary_muscles_high, primary_muscles_low, secondary_muscles, movement_categories, movement_plane, regression, full_pose, progression, sort_order) VALUES
(21, 2, 'Prayer Squat', 'Lower into a deep squat (Malasana). Bring palms together in prayer at your chest. Press your elbows into your inner knees to actively press them apart. Sit on a block if needed. This is the culmination pose — minimal props, active leverage.',
'["This is the final test — it integrates everything from 21 days","Palms together, elbows press inside knees apart","Feet flat if possible — heels on block if needed","Keep your chest lifted and spine long","Breathe deeply — you''ve earned this pose"]',
120, 0, '["block (optional)"]',
'Hip adductors, Hip extensors, Ankle dorsiflexors',
'Adductor longus, Adductor magnus, Gracilis, Gluteus maximus, Gluteus medius, Soleus, Gastrocnemius, Piriformis',
'Pelvic floor, Erector spinae, Pectoralis major (isometric in prayer), Rhomboids/Middle trapezius (shoulder retraction), Tibialis posterior',
'Deep hip flexion, Hip abduction, External rotation, Ankle dorsiflexion',
'multi-planar',
'Sit on a tall block. Keep heels on a rolled towel.',
'Deep squat with prayer hands pressing knees apart. Block under sit bones.',
'No block. Full depth. Flat feet. Elbows pressing knees wide. Chest lifted.',
42)
