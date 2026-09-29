title: 悉尼学生生活
description: GradBridge 悉尼学生生活指南，覆盖生活成本、Grocery、医疗、学习地点和日常节奏。
keywords:

Sydney Student Life
Cost of Living
Grocery
Healthcare
Study
<div class="gb-sydney-home"> <section class="gb-sydney-hero"> <div class="gb-section-label">SYDNEY · STUDENT LIFE</div> <h1>真正适应悉尼，<br>不是知道多少景点，而是建立自己的日常。</h1> <p>预算、买菜、看病、学习、运动和休息。生活稳定以后，课程和求职才更容易长期保持。</p> </section> <section class="gb-sydney-section"> <div class="gb-section-label">DAILY LIFE</div> <h2>先把每天都会遇到的问题解决</h2> <p class="gb-sydney-lead">这些不是最刺激的留学内容，却最直接决定未来几年生活质量。</p> <div class="gb-sydney-guide-grid"> <a href="/sydney/life/living-cost-budget"> <span>BUDGET</span> <h3>生活成本与预算</h3> <p>不写一个很快失真的固定数字，而是建立自己的 Sydney Budget Model。</p> </a> <a href="/sydney/life/grocery-guide"> <span>GROCERY</span> <h3>学生 Grocery 指南</h3> <p>Coles、Woolworths、Aldi 和亚洲超市如何搭配使用。</p> </a> <a href="/sydney/life/healthcare-oshc-gp"> <span>HEALTH</span> <h3>OSHC · GP · Pharmacy</h3> <p>建立留学生最基本的就医路径和保险使用意识。</p> </a> <a href="/sydney/life/study-spaces-routine"> <span>STUDY</span> <h3>学习地点与日常节奏</h3> <p>Library、Cafe、Home 和 Campus 应该分别承担什么任务。</p> </a> </div> </section> <section class="gb-sydney-section gb-sydney-rent"> <div> <div class="gb-section-label">BUILD A ROUTINE</div> <h2>降低每天重新做决定的成本。</h2> <p>固定 Grocery、固定学习地点、固定运动方式和固定通勤，可以让生活从“不断处理事情”逐渐变成稳定系统。</p> </div> <div class="gb-sydney-area-grid"> <div><span>01</span><strong>Budget</strong><small>知道钱花在哪里。</small></div> <div><span>02</span><strong>Food</strong><small>建立稳定采购习惯。</small></div> <div><span>03</span><strong>Health</strong><small>知道生病时怎么办。</small></div> <div><span>04</span><strong>Study</strong><small>找到固定学习环境。</small></div> <div><span>05</span><strong>Rest</strong><small>留出真正休息时间。</small></div> </div> </section> </div> '@
# ------------------------------------------------------------
# TRAVEL LANDING
# ------------------------------------------------------------

Write-Output ""
Write-Output "=== B10. UPGRADE TRAVEL LANDING ==="

Write-GbText "docs\sydney\travel\index.md" @'

title: 悉尼留学生周末旅行
description: 为留学生设计的悉尼 0.5 天、1 天和 2 天周末路线，重点考虑公共交通、时间成本和学生场景。
keywords:

Sydney Travel
Weekend
Day Trip
International Student
<div class="gb-sydney-home"> <section class="gb-sydney-hero"> <div class="gb-section-label">SYDNEY · WEEKEND</div> <h1>周末不需要跑很远，<br>但值得偶尔离开校园。</h1> <p>不是普通旅游门户。GradBridge 更关注学生能不能实际执行：需要多久、交通麻不麻烦、是否需要开车，以及一天真正能玩多久。</p> </section> <section class="gb-sydney-section"> <div class="gb-section-label">NO CAR FIRST</div> <h2>先判断交通摩擦，再决定去哪</h2> <div class="gb-sydney-guide-grid"> <a href="/sydney/travel/no-car-weekend-guide"> <span>START HERE</span> <h3>不开车周末怎么玩</h3> <p>先判断一个目的地到底适不适合纯公共交通学生。</p> </a> <a href="/sydney/travel/half-day-routes"> <span>0.5 DAY</span> <h3>半日路线</h3> <p>课程周也能执行的 Harbour、Coast、Sunset 与 City Walk。</p> </a> <a href="/sydney/travel/one-day-routes"> <span>1 DAY</span> <h3>一日游路线</h3> <p>Blue Mountains、Kiama、Palm Beach、Wollongong 等路线框架。</p> </a> <a href="/sydney/travel/two-day-routes"> <span>2 DAYS</span> <h3>两天一夜</h3> <p>真正腾出一个周末时，再考虑更长交通和住宿。</p> </a> </div> </section> <section class="gb-sydney-section gb-weekend-panel"> <div class="gb-section-label">CHOOSE BY TIME</div> <h2>有多少时间，就选多大的路线。</h2> <p>不要为了“周末必须出去玩”把自己搞得比上课还累。</p> <div class="gb-weekend-grid"> <a class="gb-weekend-card" href="/sydney/travel/half-day-routes"> <span>0.5 DAY</span> <h3>城市和海边</h3> <p>适合忙碌课程周。</p> <strong>Walk · Harbour · Sunset</strong> </a> <a class="gb-weekend-card" href="/sydney/travel/one-day-routes"> <span>1 DAY</span> <h3>当天往返</h3> <p>适合完整空出一个白天。</p> <strong>Nature · Coast · Town</strong> </a> <a class="gb-weekend-card" href="/sydney/travel/two-day-routes"> <span>2 DAYS</span> <h3>短途离开悉尼</h3> <p>减少赶路，真正换一个环境。</p> <strong>Stay · Walk · Slow Travel</strong> </a> <a class="gb-weekend-card" href="/sydney/travel/no-car-weekend-guide"> <span>NO CAR</span> <h3>公共交通优先</h3> <p>从学生实际执行成本判断目的地。</p> <strong>Train · Bus · Ferry</strong> </a> </div> </section> </div> '@
# ------------------------------------------------------------
# CSS
# ------------------------------------------------------------

Write-Output ""
Write-Output "=== B11. ADD CLICKABLE CARD CSS ==="

$cssPath = "D:\GradBridge\.vitepress\theme\custom.css"

$cssText = [System.IO.File]::ReadAllText(
    $cssPath,
    [System.Text.Encoding]::UTF8
)

if ($cssText.Contains("/* Sydney Phase 2 Clickable Cards */")) {

    Write-Output "SYDNEY_PHASE2_CSS_ALREADY_PRESENT"

}
else {

    $cssPatch = @'

/* Sydney Phase 2 Clickable Cards */
.gb-sydney-guide-grid > a {
display: block;
min-height: 210px;
padding: 26px;
border: 1px solid rgba(255,255,255,.07);
border-radius: 20px;
color: inherit !important;
background: rgba(255,255,255,.025);
text-decoration: none !important;
transition: transform .2s ease, background .2s ease, border-color .2s ease;
}

.gb-sydney-guide-grid > a:hover {
transform: translateY(-4px);
border-color: rgba(127,174,234,.28);
background: rgba(68,174,226,.055);
}

.gb-weekend-grid > a.gb-weekend-card {
display: block;
color: inherit !important;
text-decoration: none !important;
transition: transform .2s ease, background .2s ease, border-color .2s ease;
}

.gb-weekend-grid > a.gb-weekend-card:hover {
transform: translateY(-4px);
border-color: rgba(127,174,234,.28);
background: rgba(68,174,226,.055);
}